const Category = require("../models/category.model");

module.exports = {
    create(req, res) {
        Category.create(req.body)
            .then((cat) => res.json(cat))
            .catch((err) => res.status(400).json(err))
    },
    getAll(req, res) {
        Category.find().sort({ name: 1}).populate('products')
            .then((categorys) => res.json(categorys))
            .catch((err) => res.status(400).json(err))
    },
    delete(req, res) {
        Category.findOneAndDelete({_id: req.params.id})
            .then(category => console.log(category))
            .catch((err) => res.status(400).json(err))
    },
    update(req, res) {
        Category.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, context: 'query' })
            .then((updatedCategory) => res.json(updatedCategory))
            .catch((err) => res.status(400).json(err));
    },
    async addProduct(req, res) {
        const cat = await Category.findOneAndUpdate(
            { _id: req.body.category_id },
            { $addToSet: {products: req.body.product_id} },
            { upsert: true, new: true}
        )
        return res.json(cat)
    },
    async removeProduct(req, res) {
        const cat = await Category.findOneAndUpdate(
            { _id: req.body.category_id },
            { $pull: {products: req.body.product_id} },
            { upsert: true, new: true}
        )
        return res.json(cat)
    },
    async viewProducts(req, res) {
        const cat = await Category.findOne({ _id: req.params.id }).populate('products')
        res.json(cat);
    }
}