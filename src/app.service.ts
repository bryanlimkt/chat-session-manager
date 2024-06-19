import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { ChatNotFoundError } from './errors/chat-not-found.error';
import { SessionAlreadyExistsError } from './errors/session-already-exists.error';
import { SessionNotFoundError } from './errors/session-not-found.error';
import { ISession, ISessionKey } from './models/session.interface';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  constructor(
    @InjectModel('Session')
    private sessionModel: Model<ISession, ISessionKey>,
  ) {}
  async getSession(sessionId: string): Promise<any> {
    this.logger.log(this.getSession.name);
    const existingSession = await this.sessionModel.get({ sessionId });
    if (!existingSession) {
      throw new SessionNotFoundError();
    }
    return existingSession;
  }
  async newSession(input): Promise<any> {
    this.logger.log(this.newSession.name);
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
    this.logger.log(this.updateSession.name);
    const { sessionId, preferredName } = input;
    const existingSession = await this.sessionModel.get(sessionId);
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

  async getAllChats(sessionId: string) {
    this.logger.log(this.getAllChats.name);
    const session = await this.sessionModel.get({ sessionId });
    if (!session) {
      throw new SessionNotFoundError();
    }
    return session.chat;
  }

  async newChat(input) {
    this.logger.log(this.newChat.name);
    let updatedSession: ISession;
    const { sessionId, chatId, topic, module, difficulty } = input;
    const existingSession = await this.sessionModel.get(sessionId);
    if (!existingSession) {
      throw new SessionNotFoundError();
    }
    const chatExists = existingSession.chat?.some(
      (chat) => chat.chatId == chatId,
    );
    if (chatExists) {
      const updatedChats = existingSession.chat.map((chat) => {
        if (chat.chatId == chatId) {
          return {
            ...chat,
            topic: topic,
            module: module,
            difficulty: difficulty,
          };
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
        {
          chat: [
            ...existingSession.chat,
            { chatId, topic, module, difficulty },
          ],
        },
      );
    }
    return updatedSession.chat.find((chat) => chat.chatId == chatId);
  }

  async updateChatHistory(input) {
    this.logger.log(this.updateChatHistory.name);
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
        updatedChatHistory = {
          ...chat,
          chatHistory: chatHistory,
        };
        return updatedChatHistory;
      } else {
        return chat;
      }
    });
    const output = await this.sessionModel.update(
      { sessionId },
      { chat: updatedChats },
    );
    return updatedChatHistory;
  }

  async addFeedback(input) {
    const { sessionId, chatId, feedbackId, feedback, email } = input;
    const session = await this.sessionModel.get({ sessionId });
    if (!session) {
      throw new SessionNotFoundError();
    }
    const chatExists = session.chat.some((chat) => chat.chatId == chatId);
    if (!chatExists) {
      throw new ChatNotFoundError();
    }
    const updatedChats = session.chat.map((chat) => {
      if (chat.chatId == chatId) {
        return { ...chat, userFeedback: { feedbackId, email, feedback } };
      } else return chat;
    });
    return await this.sessionModel.update(
      { sessionId },
      { chat: updatedChats },
    );
  }
}
