import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DynamooseModule } from 'nestjs-dynamoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionAlreadyExistsFilter } from './exception-filters/session-already-exists.filter';
import { SessionSchema } from './models/session.schema';

@Module({
  imports: [
    DynamooseModule.forRoot({
      aws: {
        region: 'ap-southeast-1',
      },
    }),
    DynamooseModule.forFeature([
      {
        name: 'Session',
        schema: SessionSchema,
        options: {
          tableName: 'eduverse-test',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
