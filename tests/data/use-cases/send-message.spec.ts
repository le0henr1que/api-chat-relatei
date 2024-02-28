import { DbSendMessage } from '@/data/use-cases/db-send-message';
import { Encrypter } from '../protocols/encript';
import { mock } from 'node:test';

interface sutTypes {
  sut: DbSendMessage;
  encrypterStub: any;
}

const makeEncrypter = (): any => {
  class EncrypterStub implements Encrypter {
    async encrypt(_value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_message'));
    }
  }
  return new EncrypterStub();
};

const makeSut = (): sutTypes => {
  const encrypterStub = makeEncrypter();
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
  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const message = { message: 'valid_message' };
    const primise = sut.send(message);
    expect(primise).rejects.toThrow();
  });
});
