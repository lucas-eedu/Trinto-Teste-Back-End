const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);
const fakerBr = require('faker-br');
let userMock;

describe('Seller test suite', () => {

   describe('Create seller', () => {
      it('Should return statusCode 200 and seller data when seller has been created', async () => {
         const seller = {
            name: fakerBr.name.firstName()
         }
         const res = await request.post('/api/seller').send(seller);
         
         userMock = res.body.seller;
   
         expect(res.statusCode).toEqual(200);
         expect(res.body.seller.name).toBe(seller.name);
         expect(res.body.message).toBe('Vendedor criado com sucesso.');
      });
   
      it('Should return statusCode 400 when invalid data has been passed', async () => {
         const res = await request.post('/api/seller').send({});
         expect(res.statusCode).toEqual(400);
         expect(res.body.message).toBe('Falha ao criar o vendedor.');
      });
   });

   describe('Update Seller', () => {
      it('Should return statusCode 200 when seller has been updated', async () => {
         userMock.name = fakerBr.name.firstName();
         const res = await request.put(`/api/seller/${userMock.id}`).send(userMock);
         expect(res.statusCode).toEqual(200);
         expect(res.body.seller.name).toBe(userMock.name);
         expect(res.body.message).toBe('Vendedor atualizado com sucesso.');
      });

      it('Should return statusCode 404 when seller is not exists', async () => {
         const res = await request.put('/api/seller/0');
         expect(res.statusCode).toEqual(404);
         expect(res.body.message).toBe('ID não encontrado.');
      });
   });

   describe('Delete seller', () => {
      it('Should return statusCode 200 when seller has been removed', async () => {
         const res = await request.delete(`/api/seller/${userMock.id}`);
         expect(res.statusCode).toEqual(200);
         expect(res.body.message).toBe('Vendedor excluído com sucesso.');
      });

      it('Should return statusCode 404 when seller is not exists', async () => {
         const res = await request.delete(`/api/seller/0`);
         expect(res.statusCode).toEqual(404);
         expect(res.body.message).toBe('ID não encontrado.');
      });

      it('Should return statusCode 400 when id params is invalid', async () => {
         const res = await request.delete('/api/seller/notIsNumber');
         expect(res.statusCode).toEqual(400);
         expect(res.body.message).toBe('Falha ao excluir o vendedor.');
      });
   });

});