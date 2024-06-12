import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ChatNotFoundFilter } from './exception-filters/chat-not-found.filter';
import { SessionAlreadyExistsFilter } from './exception-filters/session-already-exists.filter';
import { SessionNotFoundFilter } from './exception-filters/session-not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new SessionNotFoundFilter(),
    new SessionAlreadyExistsFilter(),
    new ChatNotFoundFilter(),
  );
  await app.listen(3000);
}
bootstrap();
