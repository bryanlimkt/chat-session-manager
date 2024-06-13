"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionAlreadyExistsError = void 0;
class SessionAlreadyExistsError extends Error {
    constructor(message) {
        super(message || 'Session already exists');
        this.name = 'SessionAlreadyExistsError';
    }
}
exports.SessionAlreadyExistsError = SessionAlreadyExistsError;
//# sourceMappingURL=session-already-exists.error.js.map