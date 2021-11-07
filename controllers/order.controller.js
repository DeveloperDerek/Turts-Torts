const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

module.exports = {
    // @desc    Create new order
    // @route   POST /api/orders
    // @access  Private
    async createOrder (req, res) {
        const {
            cart,
            shippingAddress,
            taxPrice,
            shippingPrice,
            totalPrice,
            couponcode,
        } = req.body
        const newOrder = new Order({
            user: req.user._id,
            cart,
            couponcode,
            shippingAddress,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await newOrder.save();
        const clearCart = await Cart.updateOne(
            { _id: cart }, 
            { $unset: {
                user: ""
            }},
            { upsert: true, new: true}
        )
        res.status(201).json(createdOrder);
    },
    async getOrders (req, res) {
        const orders = await Order.find({user: req.user._id})
            .populate("cart")
        res.json(orders)
    },
    async viewOrder (req, res) {
        const orders = await Order.findOne({_id: req.params.id})
        .populate("cart")
        .populate("user")
        .populate("cartItems.product")
        res.json(orders)
    },
    async setStatus (req, res) {
        const orders = await Order.findOneAndUpdate(
            { _id: req.params.id },
            { status : req.body.status },
            { upsert: true, new: true }
            )
            return res.json(orders)
        },
    async viewOrders (req, res) {
        const orders = await Order.find()
            .populate("cart")
            .populate("user")
        res.json(orders)
    },
    async search (req, res) {
        let query = {};
        if(req.params.status && req.params.status > 0) query.status = {$in : req.params.status};
        if(req.params.min && req.params.min > 0) query.totalPrice = {$gte : req.params.min};
        if(req.params.max && req.params.max < 0) query.totalPrice = {$lte : req.params.max}; 
        if(req.params.min & req.params.max) query.totalPrice = {$gte : req.params.min, $lt: req.params.max};
        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .populate("cart")
            .populate("user")
            res.json(orders)
    }
}