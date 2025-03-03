const sequelize = require('sequelize');
require('dotenv').config();

// Connecting to the database with sequelize
const connection = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
   host: process.env.DB_HOST,
   dialect: process.env.DB_DIALECT,
   dialectModule: require('mysql2'),
   timezone: process.env.DB_TIMEZONE,
   logging: false
});

module.exports = connection;