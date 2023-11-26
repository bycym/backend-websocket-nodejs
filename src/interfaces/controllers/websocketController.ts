import http from 'http';
import { logger } from '@shared/logger/logger';
import { WebSocket, RawData } from 'ws';
import { BoatService } from 'src/application/boatService';
import { BoatRepositoryImpl } from '@infrastructure/persistence/boatRepositoryImpl';
import url from 'url';
import { v4 as uuid } from 'uuid';
import { Position } from '@domain/model/Position';
import { PositionRepositoryImpl } from '@infrastructure/persistence/positionRepositoryImpl';
import { json } from 'body-parser';

const boatRepository = new BoatRepositoryImpl();
const positionRepository = new PositionRepositoryImpl();
const boatService = new BoatService(boatRepository, positionRepository);

type extendedWebSocket = WebSocket & { name: string,}

function messageHandling (this: WebSocket, data: RawData, isBinary: boolean): void {
  const message = !isBinary ? data.toString() : ''
  logger.info(`Received message: ${message}`);
  // TODO get boatID over websocket
  // const boatId = "AECA6542-ECB2-4D58-B906-D2435F9B249E"
  // TODO get boat's name over websocket
  //this.name = "csobanka"
  const name = "csobanka"
  const newPosition = JSON.parse(message) as Position
  // const newPosition = {
  //   latitude: data['latitude'],
  //   longitude: data['longitude'],
  //   heading: data['heading'],
  // } as Position
  boatService.createBoat(name, newPosition)
}

function handleClose (this: WebSocket, code: number, reason: Buffer): void {
  logger.info('Client disconnected');
}

const websocketController = (ws: WebSocket & { name: string }, req: http.IncomingMessage): void => {
  const path = req.url; 
  // const parameters = url.parse(req.url, true);
  // ws.id = req.url?.replace('/?id=', '') ?? uuid()
  ws.name = req.url?.replace('/?name=', '') ?? 'missing'

  // Store boat if it's not exist
  // const newBoat = await boatService.createBoat(name, position);
  // res.status(201).json(newBoat);

  logger.info(`Client connected to path: ${path} as ${ws.name}.`);

  ws.on('message', messageHandling);
  ws.on('close', handleClose);
}

export default websocketController;