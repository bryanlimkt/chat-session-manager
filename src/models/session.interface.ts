export interface ISessionKey {
  sessionId: String;
}

export interface ISession extends ISessionKey {
  sessionMetadata?: { name?: string };
  chat?: IChat[];
}

export interface IChat {
  chatId?: string;
  scenario?: string;
  difficulty?: string;
  chatHistory?: any;
  chatFeedback?: string;
  userFeedback?: {
    feedbackId?: string;
    email?: string;
    feedback?: string;
  };
}
