const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);

describe('Server test suite', () => {

   it('Should return statusCode 200 and body not null when seller has been called', async () => {
      const res = await request.get('/api/seller');
      expect(res.statusCode).toEqual(200);
      expect(res.body).not.toBeNull();
   });

});