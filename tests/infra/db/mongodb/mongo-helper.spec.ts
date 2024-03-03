import { MongoHelper as sut } from '../../../../src/infra/db/mongodb/helpers/mongo-helper';

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  it('should reconnect if mongodb is down', async () => {
    let messageCollection = await sut.getCollection('messages');
    expect(messageCollection).toBeTruthy();
    await sut.disconnect();
    messageCollection = await sut.getCollection('messages');
    expect(messageCollection).toBeTruthy();
  });
});
