"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatNotFoundError = void 0;
class ChatNotFoundError extends Error {
    constructor(message) {
        super(message || 'Chat not found');
        this.name = 'ChatNotFoundError';
    }
}
exports.ChatNotFoundError = ChatNotFoundError;
//# sourceMappingURL=chat-not-found.error.js.map