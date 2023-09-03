import mongoose, {Schema, model, models} from 'mongoose';

const {ObjectId} = mongoose.Schema;

const categorySchema = new Schema({
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
    description: {
        type: String
    }, 
    photo_landscape: {
        type: String,
    },
    photo_portrait: {
        type: String,
    },
    sub_categories: [{type: ObjectId, ref: 'SubCategory', required: true}],
},
{ timestamps: true });

const Category = models.Category || model('Category', categorySchema)

export default Category;