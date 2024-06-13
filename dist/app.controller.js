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
var AppController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const base_presenter_1 = require("./base-presenter");
const response_message_1 = require("./response-message");
let AppController = AppController_1 = class AppController {
    constructor(appService) {
        this.appService = appService;
        this.logger = new common_1.Logger(AppController_1.name);
    }
    async getSession(sessionId) {
        this.logger.log(this.getSession.name);
        const session = await this.appService.getSession(sessionId);
        return new base_presenter_1.BasePresenter(common_1.HttpStatus.OK, response_message_1.ResponseMessage.SUCCESS, session);
    }
    async newSession(requestBody) {
        this.logger.log(this.newSession.name);
        const createdSession = await this.appService.newSession(requestBody);
        return new base_presenter_1.BasePresenter(common_1.HttpStatus.CREATED, response_message_1.ResponseMessage.CREATED, createdSession);
    }
    async updateSession(requestBody) {
        this.logger.log(this.updateSession.name);
        const updatedSessionData = await this.appService.updateSession(requestBody);
        return new base_presenter_1.BasePresenter(common_1.HttpStatus.OK, response_message_1.ResponseMessage.SUCCESS, updatedSessionData);
    }
    async getAllChats(sessionId) {
        this.logger.log(this.getAllChats.name);
        const allChats = await this.appService.getAllChats(sessionId);
        return new base_presenter_1.BasePresenter(common_1.HttpStatus.OK, response_message_1.ResponseMessage.SUCCESS, allChats);
    }
    async newChat(requestBody) {
        this.logger.log(this.newChat.name);
        const updatedChat = await this.appService.newChat(requestBody);
        return new base_presenter_1.BasePresenter(common_1.HttpStatus.CREATED, response_message_1.ResponseMessage.SUCCESS, updatedChat);
    }
    async updateChatHistory(requestBody) {
        this.logger.log(this.updateChatHistory.name);
        const updatedChat = await this.appService.updateChatHistory(requestBody);
        return new base_presenter_1.BasePresenter(common_1.HttpStatus.OK, response_message_1.ResponseMessage.SUCCESS, updatedChat);
    }
    async updateChatUserFeedback(requestBody) {
        this.logger.log(this.updateChatHistory.name);
        const addedFeedback = await this.appService.addFeedback(requestBody);
        return new base_presenter_1.BasePresenter(common_1.HttpStatus.CREATED, response_message_1.ResponseMessage.CREATED, addedFeedback);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('/:sessionid'),
    __param(0, (0, common_1.Param)('sessionid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getSession", null);
__decorate([
    (0, common_1.Post)('/new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "newSession", null);
__decorate([
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateSession", null);
__decorate([
    (0, common_1.Get)('/:sessionid/chats'),
    __param(0, (0, common_1.Param)('sessionid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllChats", null);
__decorate([
    (0, common_1.Post)('/chats/new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "newChat", null);
__decorate([
    (0, common_1.Put)('/chats/history'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateChatHistory", null);
__decorate([
    (0, common_1.Post)('/chats/feedback'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateChatUserFeedback", null);
exports.AppController = AppController = AppController_1 = __decorate([
    (0, common_1.Controller)('/sessions'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map