import { DataSource } from 'typeorm';
import { UserOrmEntity } from '../../src/modules/user/infrastructure/persistence/typeorm/entities/user.orm-entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'event_booking',
  synchronize: true,
  logging: false,
  entities: [UserOrmEntity],
  migrations: ['infrastructure/database/migrations/*.{ts,js}'],
  subscribers: [],
});
