import { IBoat } from '@domain/model/Boat';
import { IPosition } from '@domain/model/Position';


export interface IBoatDomainService {
  createBoat(name: string, position: IPosition): Promise<IBoat>
  addPositionForBoat(boatId: string, newPosition: IPosition): Promise<IPosition | null>;
  updatePosition(boatId: string, newPosition: IPosition): Promise<IBoat | null>;
}