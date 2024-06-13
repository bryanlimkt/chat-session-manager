import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { SessionNotFoundError } from '../errors/session-not-found.error';
export declare class SessionNotFoundFilter implements ExceptionFilter {
    catch(exception: SessionNotFoundError, host: ArgumentsHost): void;
}
