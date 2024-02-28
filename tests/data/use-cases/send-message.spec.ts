import { DbSendMessage } from '@/data/use-cases/db-send-message';

describe('DbSendMessage', () => {
  test('Should call Encrypter message', async () => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve('hashed_message'));
      }
    }
    const encrypterStub = new EncrypterStub();
    const sut = new DbSendMessage(encrypterStub);
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const message = { message: 'valid_message' };
    await sut.send(message);
    expect(encryptSpy).toHaveBeenCalledWith('valid_message');
  });
});
