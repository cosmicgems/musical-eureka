import mongoose, { Schema, model, models, Document } from 'mongoose';

const {ObjectId} = mongoose.Schema;


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
        verification_token: {
            type: String,
            required: true,
        },
        verification_token_expiration: {
            type: Date,
            required: true,
        }
        ,
        password: String,
        googleId: String,
        confirmed_account: {
        type: Boolean,
        default: false
        },
        favorite_posts: [{type: ObjectId, ref: "Blog",}],
        orders: [{type: ObjectId, ref: "Order"}],
    },
    { timestamps: true }
);

// export interface IUser extends Document {
//     first_name: string;
//     last_name: string;
//     username: string;
//     email: string;
//     about?: string;
//     verification_token: string;
//     role: number;
//     photo?: string;
//     password?: string;
//     googleId?: string;
//     confirmed_account: boolean;
//     createdAt: Date;
//     updatedAt: Date;
//     friends: any;
//     favorite_posts: any;
// }

const User = models.User || model('User', userSchema);

export default User;
