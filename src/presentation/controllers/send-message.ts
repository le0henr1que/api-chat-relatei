import { badRequest, serverError } from '../helpers/http-helper';
import {
  TokenValidator,
  Controller,
  HttpRequest,
  HttpResponse,
} from '../protocols';
import { InvalidToken, MissingParamError } from '../errors';
import { Send } from 'express';
import { SendMessage } from '@/domain/use-cases/send-message';

export class SendMessageController implements Controller {
  private readonly tokenValidator: TokenValidator;
  private readonly sendMessageStub: SendMessage;

  constructor(tokenValidator: TokenValidator, sendMessageStub: SendMessage) {
    this.tokenValidator = tokenValidator;
    this.sendMessageStub = sendMessageStub;
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
      this.sendMessageStub.send({ message: httpRequest.body.message });
    } catch (error) {
      return serverError();
    }
  }
}
