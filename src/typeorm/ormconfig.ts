import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: process.env.TYPE || 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.PORT || 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  migrationsRun: true,
  logger: 'advanced-console',
  autoLoadEntities: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  entities: [__dirname + '/entities/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/typeorm/migrations',
  },
};
export = config;
