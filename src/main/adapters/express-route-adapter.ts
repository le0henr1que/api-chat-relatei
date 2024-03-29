import { Controller } from '@/presentation/protocols';
import { RequestHandler } from 'express';

export const adapterRoute = (controller: Controller): RequestHandler => {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };
    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
