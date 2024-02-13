import { routes } from '../../adapters/inbound/api/routes';
import express from 'express';

const app = express();

app.use(express.json());

app.use('/api/v1', routes);

export { app };
