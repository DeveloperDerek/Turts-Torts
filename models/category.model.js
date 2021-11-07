const Mongoose = require("mongoose");

const categorySchema = new Mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        products : [{
            type: Mongoose.Schema.ObjectId,
            ref: 'Product'
        }]
    }, {timestamps: true}
)

const Category = Mongoose.model("Category", categorySchema);

module.exports = Category;