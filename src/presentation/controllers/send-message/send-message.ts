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
  private readonly sendMessage: SendMessage;

  constructor(tokenValidator: TokenValidator, sendMessage: SendMessage) {
    this.tokenValidator = tokenValidator;
    this.sendMessage = sendMessage;
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
      const messageResponse = await this.sendMessage.send({
        context_id: httpRequest.body.context_id,
        message: httpRequest.body.message,
        author: 'user',
      });
      return ok(messageResponse);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
