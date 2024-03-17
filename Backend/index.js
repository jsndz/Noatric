import express from "express";
import bodyParser from "body-parser";
import { connect } from "./src/config/database.js";
import apiRoute from "./src/routes/index.js"
import cors from "cors"
import passport from "passport";
import Stripe from "stripe";
import { passportAuth } from "./src/config/jwt-middleware.js";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    exposedHeaders:['X-Total-Count']
}
))

app.get('/',(req,res)=>{
    res.json({status:'sucess'})
})
app.use(passport.initialize());
passportAuth(passport)


const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};



app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})


app.use('/api',apiRoute);
const PORT = process.env.PORT ;
app.listen(PORT,  async ()=>{ 
    console.log(`server started at port ${PORT}`);
    await connect();
    console.log("MongoDB connected");
    console.log("Server started");
});
