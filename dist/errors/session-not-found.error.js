"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionNotFoundError = void 0;
class SessionNotFoundError extends Error {
    constructor(message) {
        super(message || 'Session not found');
        this.name = 'SessionNotFoundError';
    }
}
exports.SessionNotFoundError = SessionNotFoundError;
//# sourceMappingURL=session-not-found.error.js.map