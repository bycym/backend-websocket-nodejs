import { IPosition } from '@domain/model/Position';

export interface IPositionDomainService {
  addPosition(boatName: string, position: IPosition): Promise<IPosition>
  getLastPosition(position: IPosition): Promise<IPosition | null>
  findPositionsForBoat(name: string): Promise<IPosition>
}