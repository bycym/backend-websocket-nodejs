import { Boat } from '../model/Boat';

export interface BoatRepository {
  findById(id: string): Promise<Boat | null>;
  update(boat: Boat): Promise<Boat>;
}
