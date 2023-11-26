import { Boat, IBoat } from "@domain/model/Boat";
import { IPosition, Position } from "@domain/model/Position";
import { IBoatRepository } from "@domain/repository/iBoatRepository";
import { IPositionRepository } from "@domain/repository/iPositionRepository";
import { IBoatDomainService } from "@domain/service/iBoatDomainService";
import { BoatEntity } from "@infrastructure/persistence/entity/boat.entity";
import { PositionEntity } from "@infrastructure/persistence/entity/position.entity";


export class BoatService implements IBoatDomainService {
  constructor(private boatRepository: IBoatRepository, private positionRepository: IPositionRepository) {}
  async addPositionForBoat(boatId: string, newPosition: IPosition): Promise<IPosition | null> {
    throw new Error("Method not implemented.");
  }
  async createBoat(name: string, position: IPosition): Promise<IBoat> {
    const boatEntity = {
      boatName: name
    } as BoatEntity;
    const boatWithId = await this.boatRepository.add(boatEntity)
    const newPosition =  { 
      idBoat: boatWithId.id, 
      latitude: position.latitude, 
      longitude: position.longitude, 
      heading: position.heading 
    } as PositionEntity
    this.positionRepository.add(newPosition)
    return new Boat(name)
  }

  async updatePosition(boatId: string, newPosition: IPosition): Promise<IBoat | null> {
    throw new Error("Method not implemented.");
  }
}