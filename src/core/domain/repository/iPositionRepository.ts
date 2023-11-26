import { IPositionEntity } from "@infrastructure/persistence/entity/position.entity";

export interface IPositionRepository {
  add(position: IPositionEntity): Promise<IPositionEntity>;
  getLast(): Promise<IPositionEntity | null>;
}
