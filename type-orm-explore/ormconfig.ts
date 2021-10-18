import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config: SqliteConnectionOptions = {
	type: 'sqlite',
	database: 'db',
	entities: ['dist/src/**/*.entity.js'],
	synchronize: true,	// for development
	migrations: ['dist/src/db/migrations/*.js'],	// location that migrations will ba loaded
	cli: {
		migrationsDir: 'src/db/migrations',		// location that migrations will be created
	},
}

export default config;