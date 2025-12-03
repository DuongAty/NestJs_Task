import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
const mockTaskRepository = () => ({
  getTasks: jest.fn().mockResolvedValue('value'),
  findById: jest.fn().mockResolvedValue(''),
});
const mockUser = {
  username: 'duong',
  id: 'id',
  password: '123',
  task: [],
};

describe('Task Service', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTaskRepository },
      ],
    }).compile();
    tasksService = await module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });
  describe('getTask', () => {
    it('calls taskRepository and  return the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('value');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('value');
    });
  });

  describe('getTaskById', () => {
    it('calls TaskRepository.findById and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test description',
        id: 'id',
        status: TaskStatus.OPEN,
      };
      tasksRepository.findById.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('id', mockUser);
      expect(result).toEqual(mockTask);
    });
    it('calls TaskRepository.findById and handles an error', async () => {
      tasksRepository.findById.mockResolvedValue(null);
      expect(tasksService.getTaskById('id', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
