const express = require('express');
const Razorpay = require("razorpay");
require("dotenv").config();

const router = express.Router();

router.post("/order", async (req, res) => {
  console.log('order route hit')
  try {
    const razorpay = new Razorpay({
      key_id:process.env.RAZORPAY_ID || "rzp_test_GcZZFDPP0jHtC4",
      key_secret:process.env.RAZORPAY_SECRET || "6JdtQv2u7oUw7EWziYeyoewJ"
    })
    
    const { userId, amount, currency, receipt} = req.body;

    const options = {
      amount, currency, receipt
    }
    
    const order = await razorpay.orders.create(options)

    if(!order){
      return res.status(500).send("Error")
    }
    res.json(order)

  } catch (error) {
    res.status(500).send('Error')
  }
})

router.get("/payment/:paymentId", async(req, res) => {
  const {paymentId} = req.params;
  const razorpay = new Razorpay({
      key_id: "rzp_test_GcZZFDPP0jHtC4",
      key_secret:"6JdtQv2u7oUw7EWziYeyoewJ"
  })
  try {
      const payment = await razorpay.payments.fetch(paymentId)

      if (!payment){
          return res.status(500).json("Error at razorpay loading")
      }


      res.json({
          status: payment.status,
          method: payment.method,
          amount: payment.amount,
          currency: payment.currency
      })
  } catch(error) {
      res.status(500).json("failed to fetch")
  }
})




module.exports = router;