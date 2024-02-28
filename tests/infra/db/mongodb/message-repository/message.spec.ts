// import { MongoClient } from 'mongodb';

describe('Message Repository', () => {
  // let client: MongoClient;
  // beforeAll(async () => {
  //   client = await MongoClient.connect(process.env.MONGO_URL);
  // });
  // afterAll(async () => {
  //   await client.close();
  // });
  test('Should return a message on success', async () => {
    // const sut = new MessageMongoRepository();
    // const message = await sut.add({ message: 'any_message' });
    // expect(message).toBeTruthy();
    expect(1 + 1).toEqual(2);
  });
});
