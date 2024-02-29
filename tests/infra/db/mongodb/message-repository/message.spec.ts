import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { MessageMongoRepository } from '@/infra/db/mongodb/message-repository/message';

describe('Message Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    const messageCollection = MongoHelper.getCollection('messages');
    await messageCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  const makeSut = (): MessageMongoRepository => {
    return new MessageMongoRepository();
  };

  test('Should return a message on success', async () => {
    const sut = makeSut();
    const message = await sut.send({
      message: 'any_message',
    });
    expect(message).toBeTruthy();
    expect(message.id).toBeTruthy();
    expect(message.message).toBe('any_message');
  });
});
