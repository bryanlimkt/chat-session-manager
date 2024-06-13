import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ChatNotFoundError } from '../errors/chat-not-found.error';
export declare class ChatNotFoundFilter implements ExceptionFilter {
    catch(exception: ChatNotFoundError, host: ArgumentsHost): void;
}
