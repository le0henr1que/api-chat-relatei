import {
  MessageModel,
  SendMessage,
  SendMessageModel,
  Encrypter,
  SendMessageRepository,
} from './db-send-message-protocols';

export class DbSendMessage implements SendMessage {
  private readonly encrypter: Encrypter;
  private readonly sendMessageRepository: SendMessageRepository;
  constructor(
    encrypter: Encrypter,
    sendMessageRepository: SendMessageRepository,
  ) {
    this.encrypter = encrypter;
    this.sendMessageRepository = sendMessageRepository;
  }

  async send({ message }: SendMessageModel): Promise<MessageModel> {
    const hashedMessage = await this.encrypter.encrypt(message);
    const messageResponse = await this.sendMessageRepository.send({
      message: hashedMessage,
    });
    return messageResponse;
  }
}
