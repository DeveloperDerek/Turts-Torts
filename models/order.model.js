const Mongoose = require("mongoose");

const orderSchema = Mongoose.Schema(
    {
        user: {
            type: Mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        cart: {
            type: Mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Cart'
        },
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true }
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        couponcode : {
            type: String,
            default: ""
        },
        status: {
            type: Number,
            enums: [
                1,    //'processing',
                2,    //'shipping',
                3,    //'shipped'
            ],
            default: 1
        }
    },{timestamps: true}
)

const Order = Mongoose.model('Order', orderSchema)

module.exports = Order;