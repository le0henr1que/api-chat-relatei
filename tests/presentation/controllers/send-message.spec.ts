import { SendMessageController } from '@/presentation/controllers/send-message/send-message';
import {
  TokenValidator,
  MessageModel,
  SendMessageModel,
  SendMessage,
} from '../controllers/send-message/send-message-protocols';
import {
  ServerError,
  MissingParamError,
  InvalidToken,
} from '../../../src/presentation/errors';
import { response } from 'express';
import { resolve } from 'path';

const makeTokenValidator = (): TokenValidator => {
  class TokenValidatorStub implements TokenValidator {
    isValid(token: string): boolean {
      return true;
    }
  }
  return new TokenValidatorStub();
};

const makeSendMessageStub = (): SendMessage => {
  class SendMessageStub implements SendMessage {
    async send(message: SendMessageModel): Promise<MessageModel> {
      const fakeMessage = {
        responseMessage: 'valid_responseMessage',
      };
      return new Promise((resolve) => resolve(fakeMessage));
    }
  }
  return new SendMessageStub();
};

interface SutTypes {
  sut: SendMessageController;
  tokenValidatorStub: TokenValidator;
  sendMessageStub: SendMessage;
}

const makeSut = (): SutTypes => {
  const tokenValidatorStub = makeTokenValidator();
  const sendMessageStub = makeSendMessageStub();
  const sut = new SendMessageController(tokenValidatorStub, sendMessageStub);
  return {
    sut,
    tokenValidatorStub,
    sendMessageStub,
  };
};

describe('SendMessage', () => {
  test('Should return 400 if no message is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {},
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('message'));
  });
  test('Should return 400 if token message length is invalid', async () => {
    const { sut, tokenValidatorStub } = makeSut();
    jest.spyOn(tokenValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        message: 'invalid_token',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidToken('token'));
  });
  test('Should call tokenValidator with correct token', async () => {
    const { sut, tokenValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(tokenValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        message: 'any_message',
      },
    };
    await sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('any_message');
  });
  test('Should return 500 if token validator throws', async () => {
    const { sut, tokenValidatorStub } = makeSut();

    jest.spyOn(tokenValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        message: 'any_message',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
  test('Should call sendMessage with correct values', async () => {
    const { sut, sendMessageStub } = makeSut();
    const sendSpy = jest.spyOn(sendMessageStub, 'send');
    const httpRequest = {
      body: {
        message: 'any_message',
      },
    };
    await sut.handle(httpRequest);
    expect(sendSpy).toHaveBeenCalledWith({
      message: 'any_message',
    });
  });
  test('Should return 500 if sendMessage throws', async () => {
    const { sut, sendMessageStub } = makeSut();

    jest.spyOn(sendMessageStub, 'send').mockImplementationOnce(async () => {
      return new Promise((_, reject) => reject(new Error()));
    });

    const httpRequest = {
      body: {
        message: 'any_message',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        message: 'valid_token',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      responseMessage: 'valid_responseMessage',
    });
  });
});
