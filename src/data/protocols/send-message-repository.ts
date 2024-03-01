import { SendMessageModel } from '@/domain/use-cases/send-message';
import { MessageModel } from '@/domain/models/message';

export interface SendMessageRepository {
  send(message: SendMessageModel): Promise<void>;
  findMessageByContextId(context_id: string): Promise<MessageModel[]>;
}
