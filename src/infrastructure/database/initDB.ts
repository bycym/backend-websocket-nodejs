// src/infrastructure/database/initDB.ts
import { IDatabase, IMain } from 'pg-promise';
import { BoatRepositoryImpl } from '../persistence/boatRepositoryImpl';

export class DatabaseInitializer {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  async init() {
    await this.createTables();
    await this.seedData();
  }

  private async createTables() {
    // Check if the table already exists
    const tableExists = await this.tableExists('boats');

    if (!tableExists) {
      // If the table does not exist, create it
      await this.db.none(`
        CREATE TABLE boats (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          position VARCHAR(255) NOT NULL
        );
      `);
    }
  }

  private async tableExists(tableName: string): Promise<boolean> {
    const result = await this.db.oneOrNone(
      'SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = $1)',
      [tableName]
    );
    return result.exists;
  }

  private async seedData() {
    // Seed initial data if needed
  }
}

export const initDB = (db: IDatabase<any>, pgp: IMain) => {
  return new DatabaseInitializer(db, pgp);
};
