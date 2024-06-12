import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as dotenv from 'dotenv';

@Injectable()
export class InternalAuthGuard implements CanActivate {
  private logger = new Logger(InternalAuthGuard.name);

  constructor() {
    dotenv.config();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const expectedApiKey = process.env.INTERNAL_API_KEY;

    let apiKey: string;
    try {
      apiKey = request.headers['internal-api-key'];
    } catch (err) {
      this.logger.error(err.stack);
      return false;
    }
    return apiKey === expectedApiKey;
  }
}
