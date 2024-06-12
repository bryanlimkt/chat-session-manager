import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ChatNotFoundFilter } from './exception-filters/chat-not-found.filter';
import { SessionAlreadyExistsFilter } from './exception-filters/session-already-exists.filter';
import { SessionNotFoundFilter } from './exception-filters/session-not-found.filter';
import { InternalAuthGuard } from './guards/internal-auth-guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new SessionNotFoundFilter(),
    new SessionAlreadyExistsFilter(),
    new ChatNotFoundFilter(),
  );
  app.useGlobalGuards(new InternalAuthGuard());
  await app.listen(3000);
}
bootstrap();
