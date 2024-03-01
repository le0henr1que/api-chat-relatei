import request from 'supertest';
import app from '@/main/config/app';

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test_body_parser')
      .send({ message: 'valid_message', context_id: 'valid_id' })
      .expect({ message: 'valid_message', context_id: 'valid_id' });
  });
});
