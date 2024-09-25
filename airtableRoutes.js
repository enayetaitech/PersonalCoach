const { default: axios } = require('axios');
const express = require('express');
require("dotenv").config();
const router = express.Router();
const util = require('util');

router.post("/airtable", async (req, res) => {
  try {
    const { area, propertyType, bathroom, bedroom, budget } = req.body.message.toolCalls[0].function.arguments;

    console.log('request body received', req.body)

    console.log('tools calls received', req.body.message.toolCalls)

    console.log('arguments received', req.body.message.toolCalls[0].function.arguments)

    // Check if all required fields are present
    if (!area || !propertyType || !bathroom || !bedroom || !budget) {
      return res.status(400).json({ error: 'All fields (area, propertyType, bathroom, bedroom, budget) are required.' });
    }

    // Helper function to capitalize the first letter of each word
    const capitalizeFirstLetter = (str) => {
      return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    // Capitalize area and propertyType
    const capitalizedArea = capitalizeFirstLetter(area);
    const capitalizedPropertyType = capitalizeFirstLetter(propertyType);

    console.log('Data received as request.body', new Date(), 'area:', capitalizedArea, 'propertyType:', capitalizedPropertyType, 'bathroom:', bathroom, 'bedroom:', bedroom, 'budget:', budget);

    // Make request to make.com webhook
    const response = await axios.post(`https://hook.eu2.make.com/a4b097fnuhh5xnp2oz3kux70bgxjm2eq`, {
      area: capitalizedArea,
      propertyType: capitalizedPropertyType,
      bathroom,
      bedroom,
      budget
    });
    
    console.log('response received from make.com at', new Date(), 'response', response.data);
    // Return the data from the webhook response
    res.json(response.data);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error');
  }
});

router.post("/email", async (req, res) => {
  const {propertyData, customerEmail, customerName} = req.body;
    console.log('property data received', propertyData)
   
console.log('property data received', util.inspect(propertyData, { depth: null, colors: true }));

    // console.log('property data received records', propertyData.records)
    // console.log('property data received records[0]', propertyData.records[0])
    // console.log('property data received records[0]', propertyData.records[0].fields)
    // console.log('property data received records[1]', propertyData.records[1].fields)
    // console.log('property data received records[2]', propertyData.records[2].fields)
})




// first api with 5 fixed req.body
// router.post("/airtable", async (req, res) => {
//   try {
//     const { area , propertyType, bathroom, bedroom, budget} = req.body;
//     console.log('Data received from vapi at', new Date(), 'Area:', area, 'Property Type:', propertyType, 'Bathroom:', bathroom, 'Bedroom:', bedroom, 'Budget:', budget);


//     // Make request to make.com webhook
//     const response = await axios.post(`https://hook.eu2.make.com/ymcronhxemxx3eboimq4uxxqo76p8o8t`, {
//       area, propertyType, bathroom, bedroom, budget
//     });
    
//     console.log('response received from make.com at', new Date(), 'response', response.data)
//     // Return the data from the webhook response
//     res.json(response.data)

//   } catch (error) {
//     res.status(500).send('Error')
//   }
// })


module.exports = router;