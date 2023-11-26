import { IPosition, Position } from "@domain/model/Position";
import { IBoatRepository } from "@domain/repository/iBoatRepository";
import { IPositionRepository } from "@domain/repository/iPositionRepository";
import { IPositionDomainService } from "@domain/service/iPositionDomainService";
import { PositionEntity } from "@infrastructure/persistence/entity/position.entity";


export class PositionService implements IPositionDomainService {
  constructor(private boatRepository: IBoatRepository, private positionRepository: IPositionRepository) {}
  async addPosition(boatId: string, position: IPosition): Promise<IPosition> {
    const newPosition = {
      idBoat: boatId,
      latitude: position.latitude,
      longitude: position.longitude,
      heading: position.heading
    } as PositionEntity
    return this.positionRepository.add(newPosition)
  }
  async getLastPosition(position: IPosition): Promise<IPosition | null> {
    const positionEntity = await this.positionRepository.getLast()
    if(!positionEntity) return null
    return new Position(positionEntity.idBoat, positionEntity.latitude, positionEntity.longitude, positionEntity.heading)
  }
  async findPositionsForBoat(name: string): Promise<IPosition> {
    throw new Error("Method not implemented.");
  }
  
}