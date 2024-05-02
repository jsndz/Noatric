import express from "express";
import http from "http";
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

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.raw({ type: "application/json" }));

// Payment gateway setup
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

// Webhook setup
const endpointSecret =
  "whsec_3c806252812a062fa5afd52df7aea026ff64d8edbd4168a75b8055b7cb9d7df9";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;
    try {
      console.log("Request body", request.body);
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

http.createServer(app).listen(PORT, async () => {
  console.log(`Server started at port ${PORT}`);
  await connect();
  console.log("MongoDB connected");
  console.log("Server started");
});
