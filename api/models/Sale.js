const sequelize = require('sequelize');
const connection = require('../database/database');

const Seller = require('../models/Seller');

// Create sale table
const Sale = connection.define('sales', {
   value: {
      type: sequelize.DECIMAL(10, 2),
      allowNull: false,
   }
});

Seller.hasMany(Sale);

Sale.belongsTo(Seller);

Sale.sync({force: false});

module.exports = Sale;