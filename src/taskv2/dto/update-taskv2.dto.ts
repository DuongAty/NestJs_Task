import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from 'src/tasks/task-status.enum';

export class UpdateTaskv2Dto {
  @ApiProperty({
    description: 'Tiêu đề của công việc',
  })
  title: string;

  @IsEnum(TaskStatus)
  @ApiProperty({
    description: 'Trạng thái của công việc',
  })
  status: TaskStatus;
}
