"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = void 0;
const dynamoose_1 = require("dynamoose");
const chat_schema_1 = require("./chat.schema");
const session_metadata_schema_1 = require("./session-metadata.schema");
exports.SessionSchema = new dynamoose_1.Schema({
    sessionId: {
        type: String,
        hashKey: true,
    },
    sessionMetadata: {
        type: Object,
        schema: session_metadata_schema_1.SessionMetadataSchema,
    },
    chat: {
        type: Array,
        schema: [{ type: Object, schema: chat_schema_1.ChatSchema }],
        default: [],
    },
}, { timestamps: true, saveUnknown: true });
//# sourceMappingURL=session.schema.js.map