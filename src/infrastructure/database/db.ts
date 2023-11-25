import { IDatabase, IMain } from 'pg-promise';
import pgPromise from 'pg-promise';
import { error } from 'winston';

const disconnect = (client, dc, useCount) => {
  return new Promise<void>((resolve, reject) => {

    if (error) {
      console.error('Error during disconnect:', error);
      reject(error);
    } else {
      resolve();
    }
  });
};

const initOptions = {
  // disconnect,
};


const pgp: IMain = pgPromise(initOptions);

const connectionURL = process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/main';

const db: IDatabase<any> = pgp(connectionURL);

export { db };
