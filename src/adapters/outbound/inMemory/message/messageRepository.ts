import { Message } from '@/domain/entity/message/messages';

export interface IMessageRepository {
  save(message: Message): Promise<void>;
}
