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
      const name = req.body.name;
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
   try {
      const id = req.params.id;
      const name = req.body.name;
      const findSellerId = await Seller.findByPk(id);

      if (findSellerId) {
         const updateSeller = await Seller.update({name: name}, {
            where: {
               id: id
            }
         });
         res.status(200).send({
            message: 'Vendedor atualizado com sucesso.'
         });
      } else {
         res.status(404).send({
            message: 'ID não encontrado.'
         });
      }
   } catch (err) {
      res.status(400).send({
         message: 'Falha ao atualizar o vendedor.'
      });
   }
});

router.delete('/seller/:id', async (req, res) => {
   try {
      const id = req.params.id;
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