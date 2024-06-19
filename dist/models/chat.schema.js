"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSchema = void 0;
const dynamoose_1 = require("dynamoose");
const feedback_schema_1 = require("./feedback.schema");
exports.ChatSchema = new dynamoose_1.Schema({
    chatId: String,
    topic: String,
    module: String,
    difficulty: String,
    chatHistory: Object,
    chatFeedback: String,
    userFeedback: {
        type: Object,
        schema: feedback_schema_1.UserFeedbackSchema,
    },
});
//# sourceMappingURL=chat.schema.js.map