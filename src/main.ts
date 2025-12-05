import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { AuthDocumentConfig, TaskDocumentConfig } from './doccument.config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const taskConfig = TaskDocumentConfig();
  const taskDocumentFactory = () =>
    SwaggerModule.createDocument(app, taskConfig, {
      include: [TasksModule],
    });
  SwaggerModule.setup('api/task', app, taskDocumentFactory);

  const authConfig = AuthDocumentConfig();
  const userDocumentFactory = () =>
    SwaggerModule.createDocument(app, authConfig, {
      include: [AuthModule],
    });
  SwaggerModule.setup('api/auth', app, userDocumentFactory);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT')!;
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  logger.log(`Port ${port}`);
}
bootstrap();
