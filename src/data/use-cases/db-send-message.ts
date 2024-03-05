import { captureRejectionSymbol } from 'events';
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
import fs from 'fs';

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

    await this.sendMessageRepository.send({
      context_id: generatedContextId,
      message: hashedMessage,
      author,
    });

    const getContext =
      await this.sendMessageRepository.findMessageByContextId(context_id);

    const messageFormated = await Promise.all(
      getContext.map(async (element) => {
        if (context_id && element.author === 'user') {
          const decryptedMessage = await this.encrypter.decrypt(
            element.message,
          );
          return `Author: ${element.author} - Message: ${decryptedMessage} `;
        }
        if (context_id && element.author !== 'user') {
          return `Author: ${element.author} - Message: ${element.message} `;
        }
        if (!context_id) return `Author: ${author} - Message: ${message} `;
      }),
    );

    const messageInString = messageFormated.join(' ');
    console.log(messageInString);
    const promptAi = fs.readFileSync('./src/infra/prompt/prompt.txt', 'utf8');

    const mergedMessage = promptAi.replace(
      /{{{messageContext}}}/g,
      messageInString,
    );

    console.log(mergedMessage);

    const responseMessage = await this.ai.generateMessage({
      model: 'gpt-3.5-turbo-16k',
      temperature: 0.5,
      messages: [
        {
          role: 'user',
          content: mergedMessage,
        },
      ],
      stream: false,
    });

    await this.sendMessageRepository.send({
      context_id: generatedContextId,
      message: (responseMessage as any).choices[0].message.content,
      author: 'gpt',
    });

    return {
      context_id: generatedContextId,
      message: responseMessage,
      author: 'gpt-3',
    };
  }
}
