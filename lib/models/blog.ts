import mongoose, {Schema, model, models} from 'mongoose';
const {ObjectId} = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        min: 3,
        max: 160,
        index: true,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    body: {
        type: String,
        trim: true,
        required: true,
        min: 200,
        max: 2000000,
    },
    mtitle: {
        type: String,
    },
    mdesc: {
        type: String,
        
    },
    excerpt: {
        type: String,
    },
    photo: {
        type: String
    },
    categories: [{type: ObjectId, ref: 'Category', required: true}],
    sub_categories: [{type: ObjectId, ref: 'SubCategory', required: true}],
    tags: [{type: ObjectId, ref: 'Tag', required: true}],
    postedBy: {
        type: ObjectId,
        ref: 'User', required: false
    },
    read_count: {
        type: Number,
        default: 0
    },
    click_count: {
        type: Number,
        default: 0
    },
    share_count: {
        type: Number,
        default: 0
    },
    approved: {
        type: Boolean,
        default: false
    },
    approvedAt: {
        type: Date,
        default: null
    },
    featured: {
        type:Boolean,
        default: false,
        required: true,
    }
}, {timestamps: true});

const Blog = models.Blog || model('Blog', blogSchema)

export default Blog;