import {
  MessageModel,
  SendMessage,
  SendMessageModel,
  Encrypter,
} from './db-send-message-protocols';

export class DbSendMessage implements SendMessage {
  private readonly encrypter: Encrypter;
  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async send({ message }: SendMessageModel): Promise<MessageModel> {
    const hashedMessage = await this.encrypter.encrypt(message);
    return { responseMessage: hashedMessage };
  }
}
