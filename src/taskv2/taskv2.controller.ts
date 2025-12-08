import { Controller, Body, Patch, Param, Version } from '@nestjs/common';
import { Taskv2Service } from './taskv2.service';
import { UpdateTaskv2Dto } from './dto/update-taskv2.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('taskv2')
export class Taskv2Controller {
  constructor(private readonly taskv2Service: Taskv2Service) {}
  @Version('2')
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateTaskv2Dto: UpdateTaskv2Dto,
    @GetUser() user: User,
  ) {
    const { title, status } = updateTaskv2Dto;
    return this.taskv2Service.updateTaskDetails(id, title, status, user);
  }
}
