import { MessageModel } from '@/domain/models/message';
import {
  SendMessage,
  SendMessageModel,
} from '../../domain/use-cases/send-message';
import { Encrypter } from '@/data/protocols/encript';

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
