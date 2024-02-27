import { SendMessageController } from '../../../src/presentation/controllers/send-message';
import { MissingParamError } from '../../../src/presentation/errors/missing-params-error';
import { InvalidToken } from '../../../src/presentation/errors/invalid-token-error';
import { TokenValidator } from '../protocols/token-validator';

interface SutTypes {
  sut: SendMessageController;
  tokenValidatorStub: TokenValidator;
}

const makeSut = (): SutTypes => {
  class TokenValidatorStub implements TokenValidator {
    isValid(token: string): boolean {
      return true;
    }
  }
  const tokenValidatorStub = new TokenValidatorStub();
  const sut = new SendMessageController(tokenValidatorStub);
  return {
    sut,
    tokenValidatorStub,
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
