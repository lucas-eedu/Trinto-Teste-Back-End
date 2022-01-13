const express = require('express');

const app = express();

const connection = require('./database/database');

// Import Controllers
const sellerController = require('./controllers/SellerController');
const saleController = require('./controllers/SaleController');
const rankingController = require('./controllers/RankingController');

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
app.use('/api/', saleController);
app.use('/api/', rankingController);

module.exports = app;