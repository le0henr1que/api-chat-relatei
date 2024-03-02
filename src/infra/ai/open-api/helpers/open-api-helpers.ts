import env from '../../../../main/config/env';
import { OpenAI } from 'openai';

export const openai = new OpenAI({
  apiKey: env.openApiKey,
});
