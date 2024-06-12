import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { SessionAlreadyExistsError } from '../errors/session-already-exists.error';
import { Request, Response } from 'express';
import { BasePresenter } from '../base-presenter';

@Catch(SessionAlreadyExistsError)
export class SessionAlreadyExistsFilter implements ExceptionFilter {
  catch(exception: SessionAlreadyExistsError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response
      .status(HttpStatus.CONFLICT)
      .json(new BasePresenter(HttpStatus.CONFLICT, exception.message));
  }
}
