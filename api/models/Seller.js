const sequelize = require('sequelize');
const connection = require('../database/database');

// Create seller table
const Seller = connection.define('sellers', {
   name: {
      type: sequelize.STRING,
      allowNull: false,
   }
});

Seller.sync({force: false});

module.exports = Seller;