import { DbSendMessage } from '@/data/use-cases/db-send-message';

interface sutTypes {
  sut: DbSendMessage;
  encrypterStub: any;
}

const makeSut = (): sutTypes => {
  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_message'));
    }
  }
  const encrypterStub = new EncrypterStub();
  const sut = new DbSendMessage(encrypterStub);
  return { sut, encrypterStub };
};

describe('DbSendMessage', () => {
  test('Should call Encrypter message', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const message = { message: 'valid_message' };
    await sut.send(message);
    expect(encryptSpy).toHaveBeenCalledWith('valid_message');
  });
});
