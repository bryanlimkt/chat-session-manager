export interface ISessionKey {
  sessionId: string;
}

export interface ISession extends ISessionKey {
  sessionMetadata?: { name?: string };
  chat?: IChat[];
}

export interface IChat {
  chatId?: string;
  topic?: string;
  module?: string;
  difficulty?: string;
  chatHistory?: any;
  chatFeedback?: string;
  userFeedback?: {
    feedbackId?: string;
    email?: string;
    feedback?: string;
  };
}
