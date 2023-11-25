import { Boat, IPosition } from '../model/Boat';

export interface BoatDomainService {
  updatePosition(boatId: string, newPosition: IPosition): Promise<Boat | null>;
}