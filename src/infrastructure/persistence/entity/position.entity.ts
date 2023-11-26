import { IPosition } from "@domain/model/Position";
import { Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IBaseEntity } from "./iBase";

export interface IPositionEntity extends IBaseEntity, IPosition {
  created: Date
}

@Entity()
export class PositionEntity implements IPositionEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created!: Date;
  
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  latitude!: number;
  
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  longitude!: number;
  
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  heading!: number;

  // TODO: remove, use relation instead
  @Column({type: 'text'})
  idBoat!: string;
  
  // @OneToOne(() => BoatEntity)
  // @JoinColumn()
  //   Boat!: BoatEntity;

  toString(): string {
    return "PositionEntity"
  }
}