import http from 'http';
import { logger } from '@shared/logger/logger';
import { WebSocket, RawData } from 'ws';
import { BoatService } from 'src/application/boatService';
import { BoatRepositoryImpl } from '@infrastructure/persistence/boatRepositoryImpl';

const boatRepository = new BoatRepositoryImpl();
const boatService = new BoatService(boatRepository);

function messageHandling (this: WebSocket, data: RawData, isBinary: boolean): void {
  logger.info(`Received message: ${data}`);

  // boatService.updatePosition(id, newPosition);
}

function handleClose (this: WebSocket, code: number, reason: Buffer): void {
  logger.info('Client disconnected');
}

const websocketController = (ws: WebSocket, req: http.IncomingMessage): void => {
  const path = req.url; 
  logger.info(`Client connected to path: ${path}`);
  ws.on('message', messageHandling);
  ws.on('close', handleClose);
}

export default websocketController;