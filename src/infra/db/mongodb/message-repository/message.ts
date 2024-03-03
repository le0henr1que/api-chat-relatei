import { SendMessageRepository } from '@/data/protocols/send-message-repository';
import { MessageModel } from '@/domain/models/message';
import { SendMessageModel } from '@/domain/use-cases/send-message';
import { MongoHelper } from '../helpers/mongo-helper';

export class MessageMongoRepository implements SendMessageRepository {
  async findMessageByContextId(context_id: string): Promise<MessageModel[]> {
    const messageCollection = await MongoHelper.getCollection('messages');
    const allMessageByContext = await messageCollection
      .find({ context_id })
      .toArray();

    return allMessageByContext.map((message) => ({
      context_id: message.context_id,
      message: message.message,
      author: message.author,
    }));
  }

  async send({ message, context_id, author }: SendMessageModel): Promise<void> {
    const messageCollection = await MongoHelper.getCollection('messages');
    await messageCollection.insertOne({ message, context_id, author });
  }
}
