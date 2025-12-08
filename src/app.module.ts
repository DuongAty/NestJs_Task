import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { Taskv2Module } from './taskv2/taskv2.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';
        let sslConfig = {};
        let extraConfig = {};

        if (isProduction) {
          sslConfig = {
            ssl: true,
          };
          extraConfig = {
            extra: {
              ssl: {
                rejectUnauthorized: false,
              },
            },
          };
        }
        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthoried: false } : null,
          },
          type: 'postgres',
          ...sslConfig,
          ...extraConfig,
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),

    AuthModule,

    Taskv2Module,
  ],
})
export class AppModule {}
