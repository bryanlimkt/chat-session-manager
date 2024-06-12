export class ChatNotFoundError extends Error {
  constructor(message?: string) {
    super(message || 'Chat not found');
    this.name = 'ChatNotFoundError';
  }
}
