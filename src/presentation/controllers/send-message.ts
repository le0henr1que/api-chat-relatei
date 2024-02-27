import { badRequest, serverError } from '../helpers/http-helper';
import {
  TokenValidator,
  Controller,
  HttpRequest,
  HttpResponse,
} from '../protocols';
import { InvalidToken, MissingParamError } from '../errors';

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
      return serverError();
    }
  }
}
