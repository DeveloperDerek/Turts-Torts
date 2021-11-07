const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            trim: true
        },
        price: {
            type: String,
            default: 0
        },
        stock: {
            type: Number,
            default: 0
        },
        imageKey: {
            type: String
        },
    }, {timestamps: true}
)

const Product = mongoose.model("Product", productSchema);

module.exports = Product;