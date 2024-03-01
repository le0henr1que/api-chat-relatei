import { Router } from 'express';
import { makeSendMessageController } from '../factories/message';
import { adapterRoute } from '../adapters/express-route-adapter';

export default (router: Router): void => {
  router.post('/messages', adapterRoute(makeSendMessageController()));
  // router.get('/messages', (req, res) => res.json({ message: 'Hello World' }));
};
