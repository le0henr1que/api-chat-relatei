import { Router } from 'express';

const messageRoutes = Router();

messageRoutes.get('/generate', (request, response) => {
  // generateMessageController.handle(request, response);
  console.log('generate');
});

export { messageRoutes };
