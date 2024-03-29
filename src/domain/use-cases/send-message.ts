import { MessageModel, UseCaseMessageModel } from '../models/message';

export interface SendMessageModel {
  context_id: string | null;
  message: string;
  author?: string;
}

export interface SendMessage {
  send(message: SendMessageModel): Promise<UseCaseMessageModel>;
}
