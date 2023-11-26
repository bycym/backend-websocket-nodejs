import { IBoat } from '@domain/model/Boat';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IBaseEntity } from './iBase';

export interface IBoatEntity extends IBaseEntity, IBoat {
}

@Entity()
export class BoatEntity implements IBoatEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  
  @Column({type: 'text'})
  boatName!: string;

  toString(): string {
    return "BoatEntity"
  }
}
