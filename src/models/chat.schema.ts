import { Schema } from 'dynamoose';
import { UserFeedbackSchema } from './feedback.schema';

export const ChatSchema = new Schema({
  chatId: String,
  scenario: String,
  difficulty: String,
  chatHistory: Object,
  chatFeedback: String,
  userFeedback: {
    type: Object,
    schema: UserFeedbackSchema,
  },
});
