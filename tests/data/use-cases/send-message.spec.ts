import { DbSendMessage } from '@/data/use-cases/db-send-message';
import {
  Encrypter,
  MessageModel,
  SendMessageModel,
  SendMessageRepository,
} from '@/data/use-cases/db-send-message-protocols';
import { ContextId } from '../protocols/context-id';

interface sutTypes {
  sut: DbSendMessage;
  encrypterStub: Encrypter;
  sendMessageRepositoryStub: SendMessageRepository;
  contextIdStub: ContextId;
}

const makeEncrypter = (): any => {
  class EncrypterStub implements Encrypter {
    async encrypt(_value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_message'));
    }
  }
  return new EncrypterStub();
};

const makeContextIdStub = (): any => {
  class ContextId implements ContextId {
    async generate(value: string): Promise<string> {
      return new Promise((resolve) => resolve('context_id'));
    }
  }
  return new ContextId();
};

const makeSendMessageRepository = (): SendMessageRepository => {
  class SendMessageRepositoryStub implements SendMessageRepository {
    send(message: SendMessageModel): Promise<void> {
      return new Promise((resolve) => resolve());
    }
    findMessageByContextId(context_id: string): Promise<MessageModel[]> {
      const fakeMessage = [
        { message: 'valid_message', context_id: 'valid_id' },
      ];
      return new Promise((resolve) => resolve(fakeMessage));
    }
  }
  return new SendMessageRepositoryStub();
};

const makeSut = (): sutTypes => {
  const sendMessageRepositoryStub = makeSendMessageRepository();
  const encrypterStub = makeEncrypter();
  const contextIdStub = makeContextIdStub();
  const sut = new DbSendMessage(
    encrypterStub,
    sendMessageRepositoryStub,
    contextIdStub,
  );
  return { sut, encrypterStub, sendMessageRepositoryStub, contextIdStub };
};

describe('DbSendMessage', () => {
  test('Should call Encrypter message', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const message = { message: 'valid_message', context_id: 'valid_id' };
    await sut.send(message);
    expect(encryptSpy).toHaveBeenCalledWith('valid_message');
  });
  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const message = { message: 'valid_message', context_id: 'valid_id' };
    const primise = sut.send(message);
    expect(primise).rejects.toThrow();
  });
  test('Should call Context message generate method throws', async () => {
    const { sut, contextIdStub } = makeSut();
    jest
      .spyOn(contextIdStub, 'generate')
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const message = { message: 'valid_message', context_id: 'valid_id' };
    const primise = sut.send(message);
    expect(primise).rejects.toThrow();
  });
  test('Should call Context message generate', async () => {
    const { sut, contextIdStub } = makeSut();
    const contextIdSpy = jest.spyOn(contextIdStub, 'generate');
    const message = { message: 'valid_message', context_id: 'any_id' };
    await sut.send(message);
    expect(contextIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should call SendMessageRepository with correct values in method send', async () => {
    const { sut, sendMessageRepositoryStub } = makeSut();
    const sendSpy = jest.spyOn(sendMessageRepositoryStub, 'send');
    const message = { message: 'valid_message', context_id: null };
    await sut.send(message);
    expect(sendSpy).toHaveBeenCalledWith({
      message: 'hashed_message',
      context_id: 'context_id',
    });
  });

  test('Should return a message on success', async () => {
    const { sut } = makeSut();
    const messageData = { message: 'valid_message', context_id: 'valid_id' };
    jest
      .spyOn(sut, 'send')
      .mockImplementationOnce(() =>
        Promise.resolve({ ...messageData, author: 'received' }),
      );

    const message = await sut.send(messageData);
    expect(message).toEqual({ ...messageData, author: 'received' });
  });
});
