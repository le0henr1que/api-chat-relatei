import { ContextIdAdapter } from '../../infra/context-id/context-id-adapter';
import { DbSendMessage } from '../../data/use-cases/db-send-message';
import { CryptAdapter } from '../../infra/criptography/cypto-adapter';
import { MessageMongoRepository } from '../../infra/db/mongodb/message-repository/message';
import { TokenValidators } from '../../infra/validators/token-validator-adapter';
import { SendMessageController } from '../../presentation/controllers/send-message/send-message';
import { AiAdapter } from '../../infra/ai/open-api/open-api-adapter';
import { Controller } from '@/presentation/protocols';
import { LogControllerDecorator } from '../decorators/log';
import fs from 'fs';
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log';

export const makeSendMessageController = (): Controller => {
  const publicKey = fs.readFileSync('./src/infra/keys/public-key.pem', 'utf8');
  const privateKey = fs.readFileSync(
    './src/infra/keys/private-key.pem',
    'utf8',
  );
  const tokenValidator = new TokenValidators();
  const bcrypterAdapter = new CryptAdapter(publicKey, privateKey);
  const contextIdAdapter = new ContextIdAdapter();
  const aiAdapter = new AiAdapter();
  const messageMongoRepository = new MessageMongoRepository();
  const sendMessage = new DbSendMessage(
    bcrypterAdapter,
    messageMongoRepository,
    contextIdAdapter,
    aiAdapter,
  );
  const sendMessageController = new SendMessageController(
    tokenValidator,
    sendMessage,
  );
  const logErrorRepository = new LogMongoRepository();
  return new LogControllerDecorator(sendMessageController, logErrorRepository);
};
