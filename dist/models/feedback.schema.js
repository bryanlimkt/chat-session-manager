"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFeedbackSchema = void 0;
const dynamoose_1 = require("dynamoose");
exports.UserFeedbackSchema = new dynamoose_1.Schema({
    feedbackId: String,
    email: String,
    feedback: String,
});
//# sourceMappingURL=feedback.schema.js.map