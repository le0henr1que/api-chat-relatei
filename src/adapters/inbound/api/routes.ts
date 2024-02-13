import { Router } from 'express';
import { messageRoutes } from './message/message.routes';

const routes = Router({ mergeParams: true });

routes.use('/message', messageRoutes);

export { routes };
