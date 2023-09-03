import {Schema, model, models} from 'mongoose';


const subCategorySchema = new Schema({
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
},
{ timestamps: true });

const SubCategory = models.SubCategory || model('SubCategory', subCategorySchema)

export default SubCategory;