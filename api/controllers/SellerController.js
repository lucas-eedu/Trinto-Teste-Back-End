const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

// Seller Routes
router.get('/seller', async (req, res) => {
   try {
      const sellers = await Seller.findAll();
      res.status(200).send(sellers);
   } catch (err) {
      res.status(500).send({message: 'Falha ao listar os vendedores.'});
   }
});

router.post('/seller', async (req, res) => {
   try {
      const { name } = req.body;
      const createSeller = await Seller.create({
         name
      });
      res.status(200).send({
         seller: createSeller,
         message: 'Vendedor criado com sucesso.'
      });
   } catch (err) {
      res.status(400).send({
         message: 'Falha ao criar o vendedor.'
      });
   }
});

router.put('/seller/:id', async (req, res) => {
   const { id } = req.params;
   const { name } = req.body;
   const findSellerId = await Seller.findByPk(id);

   if (findSellerId) {
      await Seller.update({name: name}, {
         where: {
            id: id
         }
      });
      const seller = await Seller.findByPk(id);
      res.status(200).send({
         seller,
         message: 'Vendedor atualizado com sucesso.'
      });
   } else {
      res.status(404).send({
         message: 'ID não encontrado.'
      });
   }
});

router.delete('/seller/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const deleteSeller = await Seller.destroy({
         where: {
            id: id
         }
      });
      if(deleteSeller) {
         res.status(200).send({
            message: 'Vendedor excluído com sucesso.'
         });
      } else {
         res.status(404).send({
            message: 'ID não encontrado.'
         });
      }
   } catch (err) {
      res.status(400).send({
         message: 'Falha ao excluir o vendedor.'
      });
   }
});

module.exports = router;