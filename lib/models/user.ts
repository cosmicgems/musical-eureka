import { Schema, model, models, Document } from 'mongoose';

const userSchema = new Schema(
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
        username: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        index: true,
        lowercase: true
        },
        email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
        },
        about: {
        type: String
        },
        role: {
        type: Number,
        default: 0
        },
        photo: {
        type: String
        },
        password: String,
        googleId: String,
        confirmed_account: {
        type: Boolean,
        default: false
        }
    },
    { timestamps: true }
);

export interface IUser extends Document {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    about?: string;
    role: number;
    photo?: string;
    password?: string;
    googleId?: string;
    confirmed_account: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const User = models.User || model<IUser>('User', userSchema);

export default User;
