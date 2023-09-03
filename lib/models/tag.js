import {Schema, model, models} from 'mongoose';

const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 32,
        index: true
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
},
{ timestamps: true });

const Tag = models.Tag || model('Tag', tagSchema)

export default Tag;