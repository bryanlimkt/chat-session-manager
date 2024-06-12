import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BasePresenter } from '../base-presenter';
import { ChatNotFoundError } from '../errors/chat-not-found.error';

@Catch(ChatNotFoundError)
export class ChatNotFoundFilter implements ExceptionFilter {
  catch(exception: ChatNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response
      .status(HttpStatus.NOT_FOUND)
      .json(new BasePresenter(HttpStatus.NOT_FOUND, exception.message));
  }
}
