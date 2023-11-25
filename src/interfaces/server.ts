import express from 'express';
import boatController from '@controllers/boatController';
import winston from 'winston';
import morgan from 'morgan';
import { logger } from '@shared/logger/logger';

const app = express();

app.use(express.json());
app.use('/boats', boatController);
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));

export default app;