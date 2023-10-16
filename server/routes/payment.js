const express = require('express');
const router = express();
const stripe = require("stripe")("sk_test_51NtxOfBJLSJABj3GSRiEdfw7fvWv7LaEGxHKjaC3r2NuMnFoLTMX9YCYfcLDRblFO92vxM1iLb7166JkpsQiPgEN00TQ1szUwG"
, {
  apiVersion: "2022-08-01",
});

router.get("/", (req, res) => {
  const path = resolve("../client" + "/index.html");
  res.sendFile(path);
});

router.get("/config", (req, res) => {
  res.send({
    publishableKey: "pk_test_51NtxOfBJLSJABj3GmiB2vrEhYvoi0eG26B1gzZWJBhSFvcTx7JIu8HFGfWEH7GI71I9CwuOx6YGGeJjoHrnuGKAO00VO08C1eI",
  });
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = router;