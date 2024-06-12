import { Schema } from 'dynamoose';

export const SessionMetadataSchema = new Schema({
  name: String,
});
