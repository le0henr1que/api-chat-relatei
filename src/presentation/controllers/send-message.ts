import { MissingParamError } from '../errors/missing-params-error';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { badRequest } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { TokenValidator } from '../protocols/token-validator';
import { InvalidToken } from '../errors/invalid-token-error';
import { ServerError } from '../errors/server-error';

export class SendMessageController implements Controller {
  private readonly tokenValidator: TokenValidator;

  constructor(tokenValidator: TokenValidator) {
    this.tokenValidator = tokenValidator;
  }
  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.body.message) {
        return badRequest(new MissingParamError('message'));
      }

      const isValidToken = this.tokenValidator.isValid(
        httpRequest.body.message,
      );
      if (!isValidToken) {
        return badRequest(new InvalidToken('token'));
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}
