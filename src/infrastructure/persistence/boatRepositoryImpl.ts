import { Boat } from '@domain/model/Boat';
import { BoatRepository } from '@domain/repository/boatRepository';
import { db } from '@infrastructure/database/db';

export class BoatRepositoryImpl implements BoatRepository {
  async findById(id: string): Promise<Boat | null> {
    // Implement logic to fetch boat from the database
    const result = await db.query('SELECT * FROM boats WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async update(boat: Boat): Promise<Boat> {
    // Implement logic to update boat in the database
    const result = await db.query('UPDATE boats SET position = $1 WHERE id = $2 RETURNING *', [
      boat.position,
      boat.boatName,
    ]);
    return result.rows[0];
  }
}
