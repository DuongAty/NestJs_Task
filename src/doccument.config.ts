import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

new DocumentBuilder();
export function TaskDocumentConfig(): Omit<OpenAPIObject, 'paths'> {
  const taskConfig = new DocumentBuilder()
    .setTitle('Task')
    .setVersion('1.0')
    .addBearerAuth(
      {
        bearerFormat: 'JWT',
        scheme: 'Bearer',
        type: 'http',
      },
      'accessToken',
    )
    .build();
  return taskConfig;
}
export function AuthDocumentConfig(): Omit<OpenAPIObject, 'paths'> {
  const authConfig = new DocumentBuilder()
    .setTitle('User')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  return authConfig;
}
