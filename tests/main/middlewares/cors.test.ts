import request from 'supertest';
import app from '@/main/config/app';

describe('CORS middleware', () => {
  test('Should enable CORS', async () => {
    app.post('/test_cors', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*');
  });
});
