const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

// Ranking Routes
router.get('/ranking/week', async (req, res) => {
   try {
      const rankingSellers = await Seller.sequelize.query(`SELECT sellers.name as name, sum(sales.value) as value_sold
      FROM sales INNER JOIN sellers ON sales.sellerId = sellers.id
      WHERE date_format(sales.createdAt, '%Y-%m-%d') between date_sub(curdate(), INTERVAL 1 WEEK) and curdate()
      GROUP BY sellers.id ORDER BY value_sold DESC LIMIT 9`, {
         type: Seller.sequelize.QueryTypes.SELECT
      });
      res.status(200).send(rankingSellers);
   } catch (err) {
      res.status(500).send({
         message: 'Falha ao listar o ranking dos vendedores.',
         err
      });
   }
});

router.get('/ranking/month', async (req, res) => {
   try {
      const rankingSellers = await Seller.sequelize.query(`SELECT sellers.name as name, sum(sales.value) as value_sold
      FROM sales INNER JOIN sellers ON sales.sellerId = sellers.id
      WHERE date_format(sales.createdAt, '%Y-%m-%d') between date_sub(curdate(), INTERVAL 1 MONTH) and curdate()
      GROUP BY sellers.id ORDER BY value_sold DESC LIMIT 9`, {
         type: Seller.sequelize.QueryTypes.SELECT
      });
      res.status(200).send(rankingSellers);
   } catch (err) {
      res.status(500).send({
         message: 'Falha ao listar o ranking dos vendedores.',
         err
      });
   }
});

router.get('/ranking/year', async (req, res) => {
   try {
      const rankingSellers = await Seller.sequelize.query(`SELECT sellers.name as name, sum(sales.value) as value_sold
      FROM sales INNER JOIN sellers ON sales.sellerId = sellers.id
      WHERE date_format(sales.createdAt, '%Y-%m-%d') between date_sub(curdate(), INTERVAL 1 YEAR) and curdate()
      GROUP BY sellers.id ORDER BY value_sold DESC LIMIT 9`, {
         type: Seller.sequelize.QueryTypes.SELECT
      });
      res.status(200).send(rankingSellers);
   } catch (err) {
      res.status(500).send({
         message: 'Falha ao listar o ranking dos vendedores.',
         err
      });
   }
});

module.exports = router;