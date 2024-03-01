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

  test('Should return a message on success in create a new message', async () => {
    const sut = makeSut();
    const sendSpy = jest.spyOn(sut, 'send');

    await sut.send({
      context_id: 'any_id',
      message: 'any_message',
    });

    expect(sendSpy).toHaveBeenCalledWith({
      context_id: 'any_id',
      message: 'any_message',
    });
  });
  test('Should return a message on success in find', async () => {
    const sut = makeSut();

    const message = await sut.findMessageByContextId('any_id');

    expect(message).toBeTruthy();
  });
});
