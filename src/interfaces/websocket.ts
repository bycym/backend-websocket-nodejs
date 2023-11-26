import websocketController from '@controllers/websocketController';
import { logger } from '@shared/logger/logger';
import http from 'http';
import WebSocket from 'ws';

export default (app) => {
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server, path: '/ws' });
  wss.on('connection', websocketController);
  return server.listen(process.env.BACKEND_PORT, () => {
    logger.info(`Backend service Listening on Port ${process.env.BACKEND_PORT}`);
  });
}