import { Message } from '@/domain/message/messages';
import { IMessageRepository } from './messageRepository';

export class MessageInMemoryRepository implements IMessageRepository {
  private messages: Message[] = [];

  public async save(message: Message): Promise<void> {
    this.messages.push(message);
  }
}
