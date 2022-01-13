const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Sale Routes
router.get('/sale/ranking', async (req, res) => {
   res.send({message: 'ranking'});
});

router.post('/sale', async (req, res) => {
   try {
      const { value, sellerId } = req.body;
      const createSale = await Sale.create({
         value,
         sellerId
      });
      res.status(200).send({
         sale: createSale,
         message: 'Venda realizada com sucesso.'
      });
   } catch (err) {
      res.status(400).send({
         message: 'Falha ao realizar a venda.',
         err
      });
   }
});

module.exports = router;