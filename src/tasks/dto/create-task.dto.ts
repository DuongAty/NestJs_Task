import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tiêu đề công việc',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Mô tả chi tiết công việc',
  })
  description: string;
}
