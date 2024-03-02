import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
export default {
  port: process.env.PORT || 5050,
  mongoUrl:
    process.env.MONGO_URL ||
    'mongodb://localhost:27017/messageApiRelatei?directConnection=true',
  openApiKey: process.env.OPENAI_KEY || 'api-key',
};
