import { Router } from 'express';

const messageRoutes = Router();

messageRoutes.get('/generate', (request, response) => {
  // generateMessageController.handle(request, response);
  return response.status(200).json({ error: false, local: 'message' });
});

export { messageRoutes };
