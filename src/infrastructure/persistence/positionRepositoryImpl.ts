import { IPositionRepository } from "@domain/repository/iPositionRepository";
import AppDataSource from "@infrastructure/database/dataSource";
import { IPositionEntity, PositionEntity } from "./entity/position.entity";

export class PositionRepositoryImpl implements IPositionRepository {
  async getLast(): Promise<IPositionEntity | null > {
    const positionRepository = AppDataSource.getRepository(PositionEntity)
    return await positionRepository
      .createQueryBuilder(PositionEntity.toString())
      .orderBy(`${PositionEntity.toString()}.created`, "DESC")
      .getOne()
  }
  async add(position: IPositionEntity): Promise<IPositionEntity> {
    const positionRepository = AppDataSource.getRepository(PositionEntity)
    return await positionRepository.save(position)
  }
}