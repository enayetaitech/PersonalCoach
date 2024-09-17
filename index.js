const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const paymentRoutes = require('./paymentRoutes');
const airtableRoutes = require('./airtableRoutes')

const app = express();
const port = process.env.PORT || 5000;


// Middleware
const corsOptions = {
  origin: '*', // Allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Use the router
app.use('/api', paymentRoutes); 

app.use('/api', airtableRoutes)

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});