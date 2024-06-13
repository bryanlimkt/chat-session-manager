import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { SessionAlreadyExistsError } from '../errors/session-already-exists.error';
export declare class SessionAlreadyExistsFilter implements ExceptionFilter {
    catch(exception: SessionAlreadyExistsError, host: ArgumentsHost): void;
}
