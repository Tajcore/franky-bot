import * as dotenv from 'dotenv';
import { cwd } from 'process';
import { DataSource } from 'typeorm';

dotenv.config();

export const dataSource = new DataSource({
  type: 'mysql',
  port: parseInt(process.env["DB_PORT"] as string) || 3306,
  host: process.env["DB_HOST"] || '127.0.0.1',
  username: process.env["DB_USER"] || 'username',
  password: process.env["DB_PASSWORD"] || 'password',
  database: process.env["DB_NAME"] || 'dbname',
  entities: [cwd() + '/src/**/*.entity.ts'],
  migrations: [cwd() + '/src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
  dropSchema: false,
});
