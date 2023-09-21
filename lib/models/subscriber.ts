import { Schema, model, models, Document } from 'mongoose';

const subscriberSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      max: 32,
      index: true,
    },
    last_name: {
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
      unique: true,
    },
  },
  { timestamps: true }
);


export interface ISubscriber extends Document {
  first_name: string;
  last_name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}


const Subscriber = models.Subscriber || model<ISubscriber>('Subscriber', subscriberSchema)

export default Subscriber;
