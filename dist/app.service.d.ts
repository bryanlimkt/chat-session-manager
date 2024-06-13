import { Model } from 'nestjs-dynamoose';
import { ISession, ISessionKey } from './models/session.interface';
export declare class AppService {
    private sessionModel;
    private logger;
    constructor(sessionModel: Model<ISession, ISessionKey>);
    getSession(sessionId: string): Promise<any>;
    newSession(input: any): Promise<any>;
    updateSession(input: any): Promise<any>;
    getAllChats(sessionId: string): Promise<import("./models/session.interface").IChat[]>;
    newChat(input: any): Promise<import("./models/session.interface").IChat>;
    updateChatHistory(input: any): Promise<any>;
    addFeedback(input: any): Promise<import("nestjs-dynamoose").Item<ISession>>;
}
