import {
  ArtificialIntelligence,
  ArtificialIntelligenceConfig,
} from '@/data/protocols/ai';
import { openai } from './helpers/open-api-helpers';
import { streamToResponse, OpenAIStream } from 'ai';
import { ChatCompletion, ChatCompletionChunk } from 'openai/resources';
import { Stream } from 'openai/streaming';

export class AiAdapter implements ArtificialIntelligence {
  async generateMessage({
    model,
    temperature,
    messages,
    stream,
  }: ArtificialIntelligenceConfig): Promise<
    Stream<ChatCompletionChunk> | ChatCompletion | unknown
  > {
    const response: any = await openai.chat.completions.create({
      model,
      temperature,
      messages,
      stream,
    });
    console.log(response);
    // const streams =  OpenAIStream(response);
    // const result = await streamToResponse(streams);
    return response;
    // const streams = OpenAIStream(response);
    // return streams;
    // streamToResponse(streams, reply.raw, {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    //   },
    // });
  }
}
