const express = require('express');
var cors = require('cors');
require('dotenv').config();

// Initialize the express app
const app = express();

// Set up the middlewares
app.use(cors());
app.use(express.static('public'));
app.use( express.json() );

// Set up the routes
app.use('/api/bills', require('./routes/bills'));

// Listen to the requests
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});