"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_dynamoose_1 = require("nestjs-dynamoose");
const chat_not_found_error_1 = require("./errors/chat-not-found.error");
const session_already_exists_error_1 = require("./errors/session-already-exists.error");
const session_not_found_error_1 = require("./errors/session-not-found.error");
let AppService = AppService_1 = class AppService {
    constructor(sessionModel) {
        this.sessionModel = sessionModel;
        this.logger = new common_1.Logger(AppService_1.name);
    }
    async getSession(sessionId) {
        this.logger.log(this.getSession.name);
        const existingSession = await this.sessionModel.get({ sessionId });
        if (!existingSession) {
            throw new session_not_found_error_1.SessionNotFoundError();
        }
        return existingSession;
    }
    async newSession(input) {
        this.logger.log(this.newSession.name);
        const { sessionId, preferredName } = input;
        const existingSession = await this.sessionModel.get(sessionId);
        if (existingSession) {
            throw new session_already_exists_error_1.SessionAlreadyExistsError();
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
    async updateSession(input) {
        this.logger.log(this.updateSession.name);
        const { sessionId, preferredName } = input;
        let existingSession = await this.sessionModel.get(sessionId);
        if (!existingSession) {
            throw new session_not_found_error_1.SessionNotFoundError();
        }
        const data = await this.sessionModel.update({ sessionId: sessionId }, {
            sessionMetadata: { name: preferredName },
        });
        const { chat, ...sessionData } = data;
        return sessionData;
    }
    async getAllChats(sessionId) {
        this.logger.log(this.getAllChats.name);
        const session = await this.sessionModel.get({ sessionId });
        if (!session) {
            throw new session_not_found_error_1.SessionNotFoundError();
        }
        return session.chat;
    }
    async newChat(input) {
        this.logger.log(this.newChat.name);
        let updatedSession;
        const { sessionId, chatId, scenario, difficulty } = input;
        let existingSession = await this.sessionModel.get(sessionId);
        if (!existingSession) {
            throw new session_not_found_error_1.SessionNotFoundError();
        }
        const chatExists = existingSession.chat?.some((chat) => chat.chatId == chatId);
        if (chatExists) {
            const updatedChats = existingSession.chat.map((chat) => {
                if (chat.chatId == chatId) {
                    return { ...chat, scenario: scenario, difficulty: difficulty };
                }
                else {
                    return chat;
                }
            });
            updatedSession = await this.sessionModel.update({ sessionId }, { chat: updatedChats });
        }
        else {
            updatedSession = await this.sessionModel.update({ sessionId }, { chat: [...existingSession.chat, { chatId, scenario, difficulty }] });
        }
        return updatedSession.chat.find((chat) => chat.chatId == chatId);
    }
    async updateChatHistory(input) {
        this.logger.log(this.updateChatHistory.name);
        const { sessionId, chatId, chatHistory } = input;
        const existingSession = await this.sessionModel.get(sessionId);
        if (!existingSession) {
            throw new session_not_found_error_1.SessionNotFoundError();
        }
        const chatExists = existingSession.chat.some((chat) => chat.chatId == chatId);
        if (!chatExists) {
            throw new chat_not_found_error_1.ChatNotFoundError();
        }
        let updatedChatHistory;
        const updatedChats = existingSession.chat.map((chat) => {
            if (chat.chatId == chatId) {
                updatedChatHistory = {
                    ...chat,
                    chatHistory: chatHistory,
                };
                return updatedChatHistory;
            }
            else {
                return chat;
            }
        });
        const output = await this.sessionModel.update({ sessionId }, { chat: updatedChats });
        return updatedChatHistory;
    }
    async addFeedback(input) {
        const { sessionId, chatId, feedbackId, feedback, email } = input;
        const session = await this.sessionModel.get({ sessionId });
        if (!session) {
            throw new session_not_found_error_1.SessionNotFoundError();
        }
        const chatExists = session.chat.some((chat) => chat.chatId == chatId);
        if (!chatExists) {
            throw new chat_not_found_error_1.ChatNotFoundError();
        }
        const updatedChats = session.chat.map((chat) => {
            if (chat.chatId == chatId) {
                return { ...chat, userFeedback: { feedbackId, email, feedback } };
            }
            else
                return chat;
        });
        return await this.sessionModel.update({ sessionId }, { chat: updatedChats });
    }
};
exports.AppService = AppService;
exports.AppService = AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_dynamoose_1.InjectModel)('Session')),
    __metadata("design:paramtypes", [Object])
], AppService);
//# sourceMappingURL=app.service.js.map