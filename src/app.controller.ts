import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { BasePresenter } from './base-presenter';
import { ISession } from './models/session.interface';
import { ResponseMessage } from './response-message';

@Controller('/sessions')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:sessionid')
  async getSession(@Param('sessionid') sessionId) {
    const session = await this.appService.getSession(sessionId);
    return new BasePresenter<ISession>(
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
      session,
    );
  }
  @Post('/new')
  async newSession(@Body() requestBody) {
    const createdSession = await this.appService.newSession(requestBody);
    return new BasePresenter<ISession>(
      HttpStatus.CREATED,
      ResponseMessage.CREATED,
      createdSession,
    );
  }
  @Put('/update')
  async updateSession(@Body() requestBody) {
    const updatedSessionData = await this.appService.updateSession(requestBody);
    return new BasePresenter(
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
      updatedSessionData,
    );
  }
  @Post('/chat/new')
  async newChat(@Body() requestBody) {
    const updatedChat = await this.appService.newChat(requestBody);
    return new BasePresenter(
      HttpStatus.CREATED,
      ResponseMessage.SUCCESS,
      updatedChat,
    );
  }
  @Put('/chat/history')
  async updateChatHistory(@Body() requestBody) {
    const updatedChat = await this.appService.updateChatHistory(requestBody);
    return new BasePresenter(
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
      updatedChat,
    );
  }
}
