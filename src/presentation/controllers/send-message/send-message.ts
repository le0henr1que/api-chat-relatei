import { badRequest, serverError, ok } from '../../helpers/http-helper';
import {
  TokenValidator,
  Controller,
  HttpRequest,
  HttpResponse,
  SendMessage,
} from './send-message-protocols';
import { InvalidToken, MissingParamError } from '../../errors';

export class SendMessageController implements Controller {
  private readonly tokenValidator: TokenValidator;
  private readonly sendMessageStub: SendMessage;

  constructor(tokenValidator: TokenValidator, sendMessageStub: SendMessage) {
    this.tokenValidator = tokenValidator;
    this.sendMessageStub = sendMessageStub;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
      const messageResponse = await this.sendMessageStub.send({
        message: httpRequest.body.message,
      });
      return ok(messageResponse);
    } catch (error) {
      return serverError();
    }
  }
}
