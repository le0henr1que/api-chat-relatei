import { SendMessageRepository } from '@/data/protocols/send-message-repository';
import { MessageModel } from '@/domain/models/message';
import { SendMessageModel } from '@/domain/use-cases/send-message';
import { MongoHelper } from '../helpers/mongo-helper';

export class MessageMongoRepository implements SendMessageRepository {
  async send({ message }: SendMessageModel): Promise<MessageModel> {
    const messageCollection = MongoHelper.getCollection('messages');
    const result = await messageCollection.insertOne({ message });

    // TODO: ajustar isso para que o teste passe
    return {
      id: result.insertedId,
      message,
    };
    //TODO: mongo db alterou forma de retorno, refatorar e ajustar isso
    // console.log(`result`, result);
    // const messageResult = result.ops[0];
    // const { _id, ...messageWithoutId } = messageResult;
    // console.log(Object.assign(messageWithoutId, { id: _id }));
    // return Object.assign(messageWithoutId, { id: _id });
  }
}
