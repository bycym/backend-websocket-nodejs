import { IBoatRepository } from '@domain/repository/iBoatRepository';
import AppDataSource from '@infrastructure/database/dataSource';
import { BoatEntity, IBoatEntity } from './entity/boat.entity';

export class BoatRepositoryImpl implements IBoatRepository {
  async findByName(name: string): Promise<IBoatEntity | null> {
    const boatRepository = AppDataSource.getRepository(BoatEntity)
    const boatEntity =  await boatRepository.findOneBy({
      boatName: name
    })
    if(boatEntity)
      return boatEntity
    return null
  }
  async add(boat: IBoatEntity): Promise<IBoatEntity> {
    const boatRepository = AppDataSource.getRepository(BoatEntity)
    const storedBoatEntity =  await boatRepository.findOneBy({
      boatName: boat.boatName
    })
    if(storedBoatEntity)
      return storedBoatEntity
    const newBoatEntity = {
      boatName: boat.boatName
    } as BoatEntity
    return await boatRepository.save(newBoatEntity)
  }

  async findById(id: string): Promise<IBoatEntity | null> {
    // Implement logic to fetch boat from the database
    // const result = await db.query('SELECT * FROM boats WHERE id = $1', [id]);
    // return result.rows[0] || null;
    throw new Error('Method not implemented.');
  }

  async update(boat: IBoatEntity): Promise<IBoatEntity> {
    // Implement logic to update boat in the database
    // const result = await db.query('UPDATE boats SET position = $1 WHERE id = $2 RETURNING *', [
    //   boat.boatName,
    // ]);
    // return result.rows[0];
    throw new Error('Method not implemented.');
  }
}
