import { IBoatEntity } from "@infrastructure/persistence/entity/boat.entity";

export interface IBoatRepository {
  findById(id: string): Promise<IBoatEntity | null>;
  findByName(id: string): Promise<IBoatEntity | null>;
  update(boat: IBoatEntity): Promise<IBoatEntity>;
  add(boat: IBoatEntity): Promise<IBoatEntity>;
}
