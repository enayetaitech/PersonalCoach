import axios from "axios";
import { useState } from "react";

const Payment = () => {
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);

console.log('response id', responseId, 'response state', responseState)
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e, price) => {
    e.preventDefault();
   
    const amount = price * 100;
    const currency = "INR";
    const receipt = `receipt_${Math.random().toString(36).substring(7)}`;

    const paymentData = {
     
      amount,
      currency,
      receipt,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/api/order",
      headers: {
        "Content-Type": "application/json",
      },
      data: paymentData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log('first response', response.data)
        handleRazorpayScreen(response.data.amount);
      })
      .catch((error) => {
        console.error("error at", error);
      });
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Some error at razorpay screen loading");
      return;
    }

    const options = {
      key: "rzp_test_GcZZFDPP0jHtC4",
      amount: amount,
      currency: "INR",
      name: "English Coach",
      description: "Payment to English Coach",
      image: "https://papayacoders.com/demo.png",
      handler: async function (response) {
        setResponseId(response.razorpay_payment_id);

        // Make the second API call after Razorpay payment is completed
        try {
          const paymentResponse = await axios.get(
            `http://localhost:5000/api/payment/${response.razorpay_payment_id}`
          );
          console.log('payment response', paymentResponse)
          setResponseState(paymentResponse.data);
        } catch (error) {
          console.error("Error occurred while fetching payment details", error);
        }
      },
      prefill: {
        name: "English Coach",
        email: "info@365aitech.com",
      },
      theme: {
        color: "#F4C430",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <div>
        <button
            className="bg-black text-white py-2 mt-5 w-full text-xs rounded-lg font-bold"
            onClick={(e) => handlePayment(e, 100)}
          >
            Pay 100
          </button>
    </div>
  )
}

export default Payment