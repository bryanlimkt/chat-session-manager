import { Schema } from 'dynamoose';
import { ChatSchema } from './chat.schema';
import { SessionMetadataSchema } from './session-metadata.schema';

export const SessionSchema = new Schema(
  {
    sessionId: {
      type: String,
      hashKey: true,
    },
    sessionMetadata: {
      type: Object,
      schema: SessionMetadataSchema,
    },
    chat: {
      type: Array,
      schema: [{ type: Object, schema: ChatSchema }],
      default: [],
    },
  },
  { timestamps: true },
);
