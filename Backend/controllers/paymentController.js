require("dotenv").config();
const mongoose = require("mongoose");
const Payment = require("../models/Payment");
const User = require("../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log("The Stripe instance:", stripe);

const createPaymentIntent = async (req, res) => {
  const { user, amount, currency, payment_method_types } = req.body;

  try {
    console.log("Received payment data:", req.body);

    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        message: "Valid amount is required (in cents)",
      });
    }

    if (!currency || typeof currency !== "string") {
      return res.status(400).json({ message: "Currency is required" });
    }

    const validPaymentMethods = ["card"];
    const paymentMethodTypes =
      payment_method_types && payment_method_types.length > 0
        ? payment_method_types
        : validPaymentMethods;

    console.log("Creating payment intent with:", {
      amount,
      currency,
      payment_method_types: paymentMethodTypes,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: paymentMethodTypes,
    });

    const payment = new Payment({
      user: existingUser._id,
      amount,
      paymentMethod: "Stripe",
      status: "pending",
    });

    await payment.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
    });
  } catch (error) {
    console.error("Payment intent creation error:", error);


    if (error.type) {
      switch (error.type) {
        case 'StripeCardError':
          console.error('Stripe Card Error:', error.message);
          break;
        case 'StripeInvalidRequestError':
          console.error('Invalid request:', error.message);
          break;
        default:
          console.error('General Stripe Error:', error.message);
      }
    } else {
      console.error('General Error:', error.message);
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      stack: error.stack,
    });
  }
};

module.exports = { createPaymentIntent };
