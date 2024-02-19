import { IModel } from '../model/IModel';

export interface IMessage {
  validate: (prompt: string) => Promise<null | string>;
}
