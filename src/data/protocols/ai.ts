import {
  ChatCompletion,
  ChatCompletionChunk,
  ChatCompletionMessageParam,
} from 'openai/resources';
import { Stream } from 'openai/streaming';

export interface ArtificialIntelligenceConfig {
  model: string;
  temperature: number;
  messages: ChatCompletionMessageParam[];
  stream: boolean;
}

export interface ArtificialIntelligence {
  generateMessage: ({
    model,
    temperature,
    messages,
    stream,
  }: ArtificialIntelligenceConfig) => Promise<
    Stream<ChatCompletionChunk> | ChatCompletion | unknown
  >;
}
