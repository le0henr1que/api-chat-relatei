import { SendMessageController } from '../../../src/presentation/controllers/send-message-controller';

describe('SendMessage', () => {
  test('Should return 400 if no message is provided', () => {
    const sut = new SendMessageController();
    const httpRequest = {
      body: {
        message: 'any_message',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
