import { IModel } from '../model/IModel';
import { IMessage } from './IMessage';
import { uuid } from 'uuidv4';

export class Message implements IMessage {
  public id: string;
  public role: string;
  public content: string;
  public tokens: number;
  public model: IModel;
  public createdAt: Date;

  constructor(
    id: string,
    role: string,
    content: string,
    tokens: number,
    model: IModel,
    createdAt: Date,
  ) {
    this.id = id;
    this.role = role;
    this.content = content;
    this.tokens = tokens;
    this.model = model;
    this.createdAt = createdAt;
  }

  public async validate(prompt: string): Promise<null | string> {
    if (
      this.role != 'user' &&
      this.role != 'system' &&
      this.role != 'assistant'
    ) {
      return 'Invalid role';
    }
    if (this.content === '') {
      return 'Content cannot be empty';
    }
    if (this.createdAt.getTime() === 0) {
      return 'Invalid created at';
    }

    return null;
  }
}
