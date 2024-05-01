import express from "express";
import https from "https";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./src/config/serverconfig.js";
import { connect } from "./src/config/database.js";
import apiRoute from "./src/routes/index.js";
import passport from "passport";
import Stripe from "stripe";
import { passportAuth } from "./src/config/authConfig.js";
import { STRIPE_SK } from "./src/config/serverconfig.js";
const app = express();

const httpsOptions = {
  key: fs.readFileSync("./server.key"),
  cert: fs.readFileSync("./server.cert"),
};
app.use(
  cors({
    origin: [
      "https://localhost:5173",
      "https://m.stripe.network",
      "https://b.stripecdn.com",
      "https://newassets.hcaptcha.com",
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["X-Total-Count"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.raw({ type: "application/json" }));
//payment gateway

const stripe = Stripe(STRIPE_SK);
app.post("/create-payment-intent", async (req, res) => {
  const { totalAmount, orderId } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Webhook

const endpointSecret =
  "whsec_3c806252812a062fa5afd52df7aea026ff64d8edbd4168a75b8055b7cb9d7df9";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log({ paymentIntentSucceeded });

        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
  }
);
passportAuth(passport);
app.use("/api", apiRoute);

https.createServer(httpsOptions, app).listen(PORT, async () => {
  console.log(`server started at port ${PORT}`);
  await connect();
  console.log("MongoDB connected");
  console.log("Server started");
});
