import {Schema, model, models} from 'mongoose';

const userSchema = new Schema(
        {username: {
            type: String,
            trim: true,
            // required: true,
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
        profile: {
            type: String,
            required: true
        },
        about: {
            type: String
        },
        role: {
            type: Number,
            default: 0
        }, 
        photo: {
            data: Buffer,
            contentType: String
        },
        creationDate:{
            type: Date,
        },
        password: {
            type: String,
            required: true
        },
        confirmed_account:{
            type: Boolean,
        }},
    { timestamps: true });

const User = models.User || model('User', userSchema)

export default User;