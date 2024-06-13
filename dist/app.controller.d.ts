import { AppService } from './app.service';
import { BasePresenter } from './base-presenter';
import { ISession } from './models/session.interface';
export declare class AppController {
    private readonly appService;
    private logger;
    constructor(appService: AppService);
    getSession(sessionId: any): Promise<BasePresenter<ISession>>;
    newSession(requestBody: any): Promise<BasePresenter<ISession>>;
    updateSession(requestBody: any): Promise<BasePresenter<any>>;
    getAllChats(sessionId: string): Promise<BasePresenter<import("./models/session.interface").IChat[]>>;
    newChat(requestBody: any): Promise<BasePresenter<import("./models/session.interface").IChat>>;
    updateChatHistory(requestBody: any): Promise<BasePresenter<any>>;
    updateChatUserFeedback(requestBody: any): Promise<BasePresenter<import("nestjs-dynamoose").Item<ISession>>>;
}
