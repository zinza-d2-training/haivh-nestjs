import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'covid19_clone_db',
  synchronize: false,
  migrationsRun: true,
  logger: 'advanced-console',
  autoLoadEntities: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  entities: [__dirname + '/entity/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/typeorm/migrations',
  },
};
export = config;
