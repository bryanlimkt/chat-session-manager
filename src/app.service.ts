import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { ChatNotFoundError } from './errors/chat-not-found.error';
import { SessionAlreadyExistsError } from './errors/session-already-exists.error';
import { SessionNotFoundError } from './errors/session-not-found.error';
import { ISession, ISessionKey } from './models/session.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Session')
    private sessionModel: Model<ISession, ISessionKey>,
  ) {}
  async getSession(sessionId: string): Promise<any> {
    const existingSession = await this.sessionModel.get({ sessionId });
    if (!existingSession) {
      throw new SessionNotFoundError();
    }
    return existingSession;
  }
  async newSession(input): Promise<any> {
    const { sessionId, preferredName } = input;
    const existingSession = await this.sessionModel.get(sessionId);
    if (existingSession) {
      throw new SessionAlreadyExistsError();
    }
    const res = await this.sessionModel.create({
      sessionId,
      sessionMetadata: { name: preferredName },
    });
    const response = {
      statusCode: 200,
      body: res,
    };
    return response;
  }
  async updateSession(input: any): Promise<any> {
    const { sessionId, preferredName } = input;
    let existingSession = await this.sessionModel.get(sessionId);
    if (!existingSession) {
      throw new SessionNotFoundError();
    }
    const data = await this.sessionModel.update(
      { sessionId: sessionId },
      {
        sessionMetadata: { name: preferredName },
      },
    );

    const { chat, ...sessionData } = data;
    return sessionData;
  }

  async newChat(input) {
    let updatedSession: ISession;
    const { sessionId, chatId, scenario, difficulty } = input;
    let existingSession = await this.sessionModel.get(sessionId);
    if (!existingSession) {
      throw new SessionNotFoundError();
    }
    const chatExists = existingSession.chat?.some(
      (chat) => chat.chatId == chatId,
    );
    if (chatExists) {
      const updatedChats = existingSession.chat.map((chat) => {
        if (chat.chatId == chatId) {
          return { ...chat, scenario: scenario, difficulty: difficulty };
        } else {
          return chat;
        }
      });
      updatedSession = await this.sessionModel.update(
        { sessionId },
        { chat: updatedChats },
      );
    } else {
      updatedSession = await this.sessionModel.update(
        { sessionId },
        { chat: [...existingSession.chat, { chatId, scenario, difficulty }] },
      );
    }
    return updatedSession.chat.find((chat) => chat.chatId == chatId);
  }

  async updateChatHistory(input) {
    const { sessionId, chatId, chatHistory } = input;
    const existingSession = await this.sessionModel.get(sessionId);
    if (!existingSession) {
      throw new SessionNotFoundError();
    }
    const chatExists = existingSession.chat.some(
      (chat) => chat.chatId == chatId,
    );
    if (!chatExists) {
      throw new ChatNotFoundError();
    }
    let updatedChatHistory;
    const updatedChats = existingSession.chat.map((chat) => {
      if (chat.chatId == chatId) {
        updatedChatHistory = { ...chat, chatHistory: chatHistory };
        return updatedChatHistory;
      } else {
        return chat;
      }
    });
    await this.sessionModel.update({ sessionId }, { chat: updatedChats });
    return updatedChatHistory;
  }
}
