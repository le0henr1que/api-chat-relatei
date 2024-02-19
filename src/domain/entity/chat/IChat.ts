import { IModel } from '../model/IModel';

interface IChat {}

type chatConfig = {
  model: IModel;
  temperature: Float32Array;
  topP: Float32Array;
  n: number;
  stop: string[];
  maxTokens: number;
  presencePenalty: Float32Array;
  frequencyPenalty: Float32Array;
};

export { IChat, chatConfig };
