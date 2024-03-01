import { ContextId } from '../protocols/context-id';
import {
  MessageModel,
  SendMessage,
  SendMessageModel,
  Encrypter,
  SendMessageRepository,
  UseCaseMessageModel,
} from './db-send-message-protocols';

export class DbSendMessage implements SendMessage {
  private readonly encrypter: Encrypter;
  private readonly sendMessageRepository: SendMessageRepository;
  private readonly contextId: ContextId;

  constructor(
    encrypter: Encrypter,
    sendMessageRepository: SendMessageRepository,
    contextId: ContextId,
  ) {
    this.encrypter = encrypter;
    this.sendMessageRepository = sendMessageRepository;
    this.contextId = contextId;
  }

  async send({
    message,
    context_id,
  }: SendMessageModel): Promise<UseCaseMessageModel> {
    const hashedMessage = await this.encrypter.encrypt(message);
    const generatedContextId = await this.contextId.generate(context_id);

    await this.sendMessageRepository.send({
      context_id: generatedContextId,
      message: hashedMessage,
    });

    const getContext =
      await this.sendMessageRepository.findMessageByContextId(context_id);

    return {
      context_id: generatedContextId,
      message: getContext[0].message,
      type: 'received',
    };
  }
}
