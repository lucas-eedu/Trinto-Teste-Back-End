const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);
const fakerBr = require('faker-br');
let userMock;

describe('Sale test suite', () => {

   it('Should return statusCode 200 and sale data when sale has been created', async () => {
      userMock = await request.get('/api/seller');
      userMock = userMock.body[0];
      const sale = {
         value: fakerBr.finance.amount(),
         sellerId: userMock.id
      }

      const res = await request.post('/api/sale').send(sale);
      expect(res.statusCode).toEqual(200);
      expect(res.body.sale.value).toBe(sale.value);
      expect(res.body.sale.sellerId).toBe(sale.sellerId);
      expect(res.body.message).toBe('Venda realizada com sucesso.');
   });

   it('Should return statusCode 400 when invalid data has been passed', async () => {
      const res = await request.post('/api/sale').send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('Falha ao criar a venda.');
   });

});