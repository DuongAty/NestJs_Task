import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TaskStatus } from 'src/tasks/task-status.enum';
import { User } from 'src/auth/user.entity';
import { Task } from 'src/tasks/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class Taskv2Service {
  private logger = new Logger();
  constructor(
    @InjectRepository(Task)
    private taskService: Repository<Task>,
  ) {}
  async updateTaskDetails(
    id: string,
    title: string,
    status: TaskStatus | undefined,
    user: User,
  ): Promise<Task> {
    const task = await this.taskService.findOne({ where: { id, user } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return this.taskService.save(
      Object.assign(task, {
        ...(title !== undefined && { title }),
        ...(status !== undefined && { status }),
      }),
    );
  }
}
// if (status !== undefined) {
//   task.status = status;
// }
// if (title !== undefined) {
//   task.title = title;
// }
// if (status === undefined && title === undefined) {
//   return task;
// }
// await this.taskService.save(task);
// return task;
