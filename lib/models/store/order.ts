import mongoose, { Schema, model, models, Document } from 'mongoose';

const {ObjectId} = mongoose.Schema;

const orderSchema = new Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
        },
        poNumber: String,
        customerId: String,
    },
    { timestamps: true }
);

// const orderSchema = new Schema(
//     {
//         additionalFees: {
//             type: Array,
//         },
//         alerts: {
//             type: Array,
//         },
//         app:{
//             type: String,
//         },
//         billingAddress:{
//             type: Object,
//         },
//         billingAddressMatchesShippingAddress:{
//             type: Boolean,
//         },
//         canNotifyCustomer: {
//             type: Boolean,
//         },
//         cancelReason: {
//             type: String
//         },
//         cancellation: {
//             type: Object,
//         },
//         capturable: {
//             type: Boolean,
//         },
//         cartDiscountAmountSet: {
//             type: Array,
//         },
//         channelInformation: {
//             type: Object,
//         },
//         clientIp: {
//             type: String,
//         },
//         closed: {
//             type: Boolean,
//         },
//         closedAt: {
//             type: Date,
//         },
//         confirmationNumber: {
//             type: String,
//         },
//         confirmed: {
//             type: Boolean,
//         }
//     },
//     { timestamps: true }
// );

const Order = models.Order || model('Order', orderSchema);

export default Order;