// models/question.js

import { Schema, model, models } from 'mongoose';

const subscriberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max: 32,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Question = models.Question || model('Question', questionSchema)

export default Question;
