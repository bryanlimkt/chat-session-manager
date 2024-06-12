export class SessionAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message || 'Session already exists');
    this.name = 'SessionAlreadyExistsError';
  }
}
