import { DbSendMessage } from '@/data/use-cases/db-send-message';
import {
  Encrypter,
  MessageModel,
  SendMessageModel,
  SendMessageRepository,
} from '@/data/use-cases/db-send-message-protocols';

interface sutTypes {
  sut: DbSendMessage;
  encrypterStub: Encrypter;
  sendMessageRepositoryStub: SendMessageRepository;
}

const makeEncrypter = (): any => {
  class EncrypterStub implements Encrypter {
    async encrypt(_value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_message'));
    }
  }
  return new EncrypterStub();
};

const makeSendMessageRepository = (): SendMessageRepository => {
  class SendMessageRepositoryStub implements SendMessageRepository {
    send(message: SendMessageModel): Promise<MessageModel> {
      const fakeMessage = { message: 'hashed_message' };
      return new Promise((resolve) => resolve(fakeMessage));
    }
  }
  return new SendMessageRepositoryStub();
};

const makeSut = (): sutTypes => {
  const sendMessageRepositoryStub = makeSendMessageRepository();
  const encrypterStub = makeEncrypter();
  const sut = new DbSendMessage(encrypterStub, sendMessageRepositoryStub);
  return { sut, encrypterStub, sendMessageRepositoryStub };
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
  test('Should call SendMessageRepository with correct values', async () => {
    const { sut, sendMessageRepositoryStub } = makeSut();
    const sendSpy = jest.spyOn(sendMessageRepositoryStub, 'send');

    const message = { message: 'valid_message' };
    await sut.send(message);
    expect(sendSpy).toHaveBeenCalledWith({
      message: 'hashed_message',
    });
  });
  test('Should throw if messageRepository throws', async () => {
    const { sut, sendMessageRepositoryStub } = makeSut();
    jest
      .spyOn(sendMessageRepositoryStub, 'send')
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const message = { message: 'valid_message' };
    const primise = sut.send(message);
    expect(primise).rejects.toThrow();
  });
});
