import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import config from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, PetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
