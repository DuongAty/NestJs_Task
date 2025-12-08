import { Injectable } from '@nestjs/common';
import { TasksRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
import { PaginationDto } from 'src/pagination/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TasksRepository) {}

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  getTaskById(id: string, user: User): Promise<Task | null> {
    return this.taskRepository.findById(id, user);
  }

  getTasks(
    filterDto: GetTaskFilterDto,
    user: User,
    paginationDto: PaginationDto,
  ): Promise<{ data: Task[]; totalPages: number }> {
    return this.taskRepository.getTasks(filterDto, user, paginationDto);
  }

  updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    return this.taskRepository.updateTaskStatus(id, status, user);
  }

  deleteTaskById(id: string, user: User): Promise<void> {
    return this.taskRepository.deleteTask(id, user);
  }
}
