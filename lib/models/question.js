// models/question.js

import { Schema, model, models } from 'mongoose';

const questionSchema = new Schema(
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
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Question = models.Question || model('Question', questionSchema)

export default Question;
