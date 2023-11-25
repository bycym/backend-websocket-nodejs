import websocketController from '@controllers/websocketController';
import app from '@interfaces/server';
import { logger } from '@shared/logger/logger';
import { json } from 'body-parser';
import 'dotenv/config'
import http from 'http';
import WebSocket from 'ws';

init();

async function init() {
  try {
    // TODO: use class instead of this solution
    const server = http.createServer(app);
    const wss = new WebSocket.Server({ server, path: '/ws' });

    wss.on('connection', websocketController);
    server.listen(process.env.BACKEND_PORT, () => {
      logger.info(`Backend service Listening on Port ${process.env.BACKEND_PORT}`);
    });

  } catch (error) {
    logger.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}