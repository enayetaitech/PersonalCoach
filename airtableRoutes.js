const { default: axios } = require('axios');
const express = require('express');
require("dotenv").config();
const router = express.Router();

router.post("/airtable", async (req, res) => {
  try {
    const { area , propertyType, bathroom, bedroom, budget} = req.body;
    console.log('Data received from vapi at', new Date(), 'Area:', area, 'Property Type:', propertyType, 'Bathroom:', bathroom, 'Bedroom:', bedroom, 'Budget:', budget);


    // Make request to make.com webhook
    const response = await axios.post(`https://hook.eu2.make.com/ymcronhxemxx3eboimq4uxxqo76p8o8t`, {
      area, propertyType, bathroom, bedroom, budget
    });
    
    console.log('response received from make.com at', new Date(), 'response', response.data)
    // Return the data from the webhook response
    res.json(response.data)

  } catch (error) {
    res.status(500).send('Error')
  }
})


module.exports = router;