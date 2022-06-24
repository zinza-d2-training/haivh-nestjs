import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeormModule } from './typeorm/typeorm.module';
import { AdministrativeUnitModule } from './administrative_unit/administrative_unit.module';
import { ConsoleModule } from '@squareboat/nest-console';
import { AuthModule } from './auth/auth.module';
import { SubdivisionsModule } from './subdivisions/subdivisions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConsoleModule,
    TypeormModule.forRoot(),
    UsersModule,
    AdministrativeUnitModule,
    AuthModule,
    SubdivisionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
