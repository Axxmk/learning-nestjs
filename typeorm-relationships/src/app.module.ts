import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TasksModule } from './tasks/tasks.module';
import { MeetingsModule } from './meetings/meetings.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: '../db',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    logging: true,
  }), EmployeesModule, TasksModule, MeetingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
