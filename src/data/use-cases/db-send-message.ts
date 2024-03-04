import { Stream } from 'openai/streaming';
import {
  MessageModel,
  SendMessage,
  SendMessageModel,
  Encrypter,
  SendMessageRepository,
  UseCaseMessageModel,
  ContextId,
  ArtificialIntelligence,
} from './db-send-message-protocols';
import { ChatCompletion, ChatCompletionChunk } from 'openai/resources';

export class DbSendMessage implements SendMessage {
  private readonly encrypter: Encrypter;
  private readonly sendMessageRepository: SendMessageRepository;
  private readonly contextId: ContextId;
  private readonly ai: ArtificialIntelligence;

  constructor(
    encrypter: Encrypter,
    sendMessageRepository: SendMessageRepository,
    contextId: ContextId,
    ai: ArtificialIntelligence,
  ) {
    this.encrypter = encrypter;
    this.sendMessageRepository = sendMessageRepository;
    this.contextId = contextId;
    this.ai = ai;
  }

  async send({
    message,
    context_id,
    author,
  }: SendMessageModel): Promise<UseCaseMessageModel> {
    const hashedMessage = await this.encrypter.encrypt(message);
    const generatedContextId = await this.contextId.generate(context_id);
    // console.log(hashedMessage);
    // console.log('context', generatedContextId);

    await this.sendMessageRepository.send({
      context_id: generatedContextId,
      message: hashedMessage,
      author,
    });

    const getContext =
      await this.sendMessageRepository.findMessageByContextId(context_id);

    console.log(getContext);

    //   const responseMessage = await this.ai.generateMessage({
    //     model: 'gpt-3.5-turbo-16k',
    //     temperature: 0.5,
    //     messages: [
    //       {
    //         role: 'user',
    //         content: createContext,
    //       },
    //     ],
    //     stream: false,
    //   });

    return {
      context_id: 'generatedContextId',
      message: 'responseMessage',
      author: 'gpt-3',
    };
  }
}
