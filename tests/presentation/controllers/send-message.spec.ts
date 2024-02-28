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
    send(message: SendMessageModel): MessageModel {
      const fakeMessage = {
        id: 'valid_id',
        message: 'valid_message',
      };
      return fakeMessage;
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
  test('Should return 400 if no message is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {},
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('message'));
  });
});

describe('SendMessage', () => {
  test('Should return 400 if token message length is invalid', () => {
    const { sut, tokenValidatorStub } = makeSut();
    jest.spyOn(tokenValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        message: 'invalid_token',
      },
    };
    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidToken('token'));
  });
});

describe('SendMessage', () => {
  test('Should call tokenValidator with correct token', () => {
    const { sut, tokenValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(tokenValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        message: 'any_message',
      },
    };
    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('any_message');
  });
});

describe('SendMessage', () => {
  test('Should return 500 if token validator throws', () => {
    const { sut, tokenValidatorStub } = makeSut();

    jest.spyOn(tokenValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        message: 'any_message',
      },
    };
    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});

describe('SendMessage', () => {
  test('Should call sendMessage with correct values', () => {
    const { sut, sendMessageStub } = makeSut();
    const sendSpy = jest.spyOn(sendMessageStub, 'send');
    const httpRequest = {
      body: {
        message: 'any_message',
      },
    };
    sut.handle(httpRequest);
    expect(sendSpy).toHaveBeenCalledWith({
      message: 'any_message',
    });
  });
});

describe('SendMessage', () => {
  test('Should return 500 if sendMessage throws', () => {
    const { sut, sendMessageStub } = makeSut();

    jest.spyOn(sendMessageStub, 'send').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        message: 'any_message',
      },
    };
    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
