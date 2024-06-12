import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { SessionNotFoundError } from '../errors/session-not-found.error';
import { Request, Response } from 'express';
import { BasePresenter } from '../base-presenter';

@Catch(SessionNotFoundError)
export class SessionNotFoundFilter implements ExceptionFilter {
  catch(exception: SessionNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response
      .status(HttpStatus.NOT_FOUND)
      .json(new BasePresenter(HttpStatus.NOT_FOUND, exception.message));
  }
}
