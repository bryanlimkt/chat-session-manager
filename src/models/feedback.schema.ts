import { Schema } from 'dynamoose';

export const UserFeedbackSchema = new Schema({
  feedbackId: String,
  email: String,
  feedback: String,
});
