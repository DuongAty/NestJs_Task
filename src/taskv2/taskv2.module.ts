import { Module } from '@nestjs/common';
import { Taskv2Service } from './taskv2.service';
import { Taskv2Controller } from './taskv2.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [Taskv2Controller],
  providers: [Taskv2Service],
})
export class Taskv2Module {}
