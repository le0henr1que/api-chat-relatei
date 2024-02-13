import { Message } from '@/domain/message/messages';

export interface IMessageRepository {
  save(message: Message): Promise<void>;
}
