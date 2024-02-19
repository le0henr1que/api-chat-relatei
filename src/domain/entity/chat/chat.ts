import { IMessage } from '../message/IMessage';
import { IChat, chatConfig } from './IChat';

class Chat implements IChat {
  public id: string;
  public userId: string;
  public initialSystemMessage: IMessage;
  public messages: IMessage[];
  public erasedMessages: IMessage[];
  public status: string;
  public tokenUsage: number;
  public config: chatConfig;

  constructor(
    id: string,
    userId: string,
    initialSystemMessage: IMessage,
    messages: IMessage[],
    erasedMessages: IMessage[],
    status: string,
    tokenUsage: number,
    config: chatConfig,
  ) {
    this.id = id;
    this.userId = userId;
    this.initialSystemMessage = initialSystemMessage;
    this.messages = messages;
    this.erasedMessages = erasedMessages;
    this.status = status;
    this.tokenUsage = tokenUsage;
    this.config = config;
  }
}

export { Chat };
