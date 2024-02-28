import { MessageModel } from '../models/message';

export interface SendMessageModel {
  message: string;
}

export interface SendMessage {
  send(message: SendMessageModel): MessageModel;
}
