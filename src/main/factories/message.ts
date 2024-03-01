import { ContextIdAdapter } from '../../infra/context-id/context-id-adapter';
import { DbSendMessage } from '../../data/use-cases/db-send-message';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { MessageMongoRepository } from '../../infra/db/mongodb/message-repository/message';
import { TokenValidators } from '../../infra/validators/token-validator-adapter';
import { SendMessageController } from '../../presentation/controllers/send-message/send-message';

export const makeSendMessageController = (): SendMessageController => {
  const salt = 12;
  const tokenValidator = new TokenValidators();
  const bcrypterAdapter = new BcryptAdapter(salt);
  const contextIdAdapter = new ContextIdAdapter();
  const messageMongoRepository = new MessageMongoRepository();
  const sendMessage = new DbSendMessage(
    bcrypterAdapter,
    messageMongoRepository,
    contextIdAdapter,
  );
  return new SendMessageController(tokenValidator, sendMessage);
};
