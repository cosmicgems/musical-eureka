import { Schema, model, models, Document } from 'mongoose';

const slugAdFormSchema = new Schema(
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
    company: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
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
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export interface ISlugAdForm extends Document {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}


const SlugAdForm = models.SlugAdForm || model<ISlugAdForm>('SlugAdForm', slugAdFormSchema)

export default SlugAdForm;
