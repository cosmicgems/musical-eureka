import mongoose, { Schema, model, models, Document } from 'mongoose';

const {ObjectId} = mongoose.Schema;

const wishlistItemSchema = new Schema(
    {
        price: String,
        name: String,
        image: String,
        path: String,
        description: String,
        qty: Number
    },
    { timestamps: true }
);


const WishlistItem = models.WishlistItem || model('WishlistItem', wishlistItemSchema);

export default WishlistItem;