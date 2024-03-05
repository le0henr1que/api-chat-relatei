import request from 'supertest';
import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import OpenAI from 'openai';

describe('Message routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    const messageCollection = await MongoHelper.getCollection('messages');
    await messageCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return an message on success', async () => {
    await request(app)
      .post('/v1/messages')
      .send({
        message: 'Olá, mundo!',
      })
      .expect(500);
  });
});
