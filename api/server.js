const express = require('express');

const app = express();

const connection = require('./database/database');

// Import Controllers
const sellerController = require('./controllers/SellerController');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Database Connection
connection
   .authenticate()
   .then(() => {
      console.log('Connection Success');
   })
   .catch((error) => {
      console.error(error);
   })

app.use('/api/', sellerController);

module.exports = app;