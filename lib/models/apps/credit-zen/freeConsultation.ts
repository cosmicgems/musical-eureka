import { Schema, model, models, Document } from 'mongoose';

const addressSchema = new Schema({
    line_one: String,
    line_two: String,
    city: String,
    state: String,
    zip: String,
});
const birthdateSchema = new Schema({
    month: Number,
    day: Number,
    year: Number,
});

const ssnSchema = new Schema({
    sequence_one: String,
    sequence_two: String,
    sequence_three: String,
});


const freeConsultationSchema = new Schema(
    {
        first_name: {
        type: String,
        trim: true,
        required: true
        },
        last_name: {
        type: String,
        trim: true,
        required: true
        },
        email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
        },
        phone: String,
        securessn: ssnSchema,
        address: addressSchema,
    },
    { timestamps: true }
);

export interface IFreeConsultation extends Document {
    first_name: string;
    last_name: string;
    email: string;
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    birthdate: {
        month: number;
        day: number;
        year: number;
    };
    phone: {
        sequence_one: string;
        sequence_two: string;
        sequence_three: string;
    };
    securessn: {
        sequence_one: string;
        sequence_two: string;
        sequence_three: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const FreeConsultation = models.FreeConsultation || model<IFreeConsultation>('FreeConsultation', freeConsultationSchema);

export default FreeConsultation;
