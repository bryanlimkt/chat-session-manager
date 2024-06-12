import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
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
  private logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get('/:sessionid')
  async getSession(@Param('sessionid') sessionId) {
    this.logger.log(this.getSession.name);
    const session = await this.appService.getSession(sessionId);
    return new BasePresenter<ISession>(
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
      session,
    );
  }
  @Post('/new')
  async newSession(@Body() requestBody) {
    this.logger.log(this.newSession.name);
    const createdSession = await this.appService.newSession(requestBody);
    return new BasePresenter<ISession>(
      HttpStatus.CREATED,
      ResponseMessage.CREATED,
      createdSession,
    );
  }
  @Put('/update')
  async updateSession(@Body() requestBody) {
    this.logger.log(this.updateSession.name);
    const updatedSessionData = await this.appService.updateSession(requestBody);
    return new BasePresenter(
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
      updatedSessionData,
    );
  }
  @Get('/:sessionid/chats')
  async getAllChats(@Param('sessionid') sessionId: string) {
    this.logger.log(this.getAllChats.name);
    const allChats = await this.appService.getAllChats(sessionId);
    return new BasePresenter(HttpStatus.OK, ResponseMessage.SUCCESS, allChats);
  }
  @Post('/chats/new')
  async newChat(@Body() requestBody) {
    this.logger.log(this.newChat.name);
    const updatedChat = await this.appService.newChat(requestBody);
    return new BasePresenter(
      HttpStatus.CREATED,
      ResponseMessage.SUCCESS,
      updatedChat,
    );
  }
  @Put('/chats/history')
  async updateChatHistory(@Body() requestBody) {
    this.logger.log(this.updateChatHistory.name);
    const updatedChat = await this.appService.updateChatHistory(requestBody);
    return new BasePresenter(
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
      updatedChat,
    );
  }

  @Post('/chats/feedback')
  async updateChatUserFeedback(@Body() requestBody) {
    this.logger.log(this.updateChatHistory.name);
    const addedFeedback = await this.appService.addFeedback(requestBody);
    return new BasePresenter(
      HttpStatus.CREATED,
      ResponseMessage.CREATED,
      addedFeedback,
    );
  }
}
