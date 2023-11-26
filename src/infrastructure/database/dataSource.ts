import "reflect-metadata"
import { DataSource } from "typeorm"
import { BoatEntity } from "@infrastructure/persistence/entity/boat.entity"
import { PositionEntity } from "@infrastructure/persistence/entity/position.entity"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres-db",
    port: 5432,
    username: "user",
    password: "password",
    database: "main",
    entities: [  BoatEntity, PositionEntity ],
    synchronize: true,
    logging: false,
    subscribers: [],
    migrations: [],
})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))

export default AppDataSource