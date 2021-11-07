const Animal = require("../models/animal.model");

module.exports = {
    create(req, res) {
        Animal.create(req.body)
            .then((animal) => res.json(animal))
            .catch(err => res.status(400).json(err))
    },
    findOne(req, res) {
        Animal.findById({ _id: req.params.id})
            .then((animal) => res.json(animal))
            .catch((err) => res.status(400).json(err))
    },
    findAll(req, res) {
        Animal.find().sort({ commonName: 1 })
            .then((animal) => res.json(animal))
            .catch((err) => res.status(400).json(err))
    },
    search(req, res) {
        Animal.find({
            commonName: { "$regex": req.params.name, "$options": "i" }
        })
            .sort({ commonName: 1 })
            .then((animals) => res.json(animals))
    },
    findTurtles(req, res) {
        Animal.find({ category: turtle }).sort({ commonName: 1 })
            .then((turt) => res.json(turt))
            .catch((err) => res.status(400).json(err))
    },
    findTortoises(req, res) {
        Animal.find({ category: tortoise }).sort({ commonName: 1 })
            .then((tort) => res.json(tort))
            .catch((err) => res.status(400).json(err))
    },
    update(req, res) {
        Animal.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, context: 'query', upsert: true, new: true })
            .then((updated) => res.json(updated))
            .catch((err) => res.status(400).json(err));
    },
    delete(req, res) {
        Animal.findOneAndDelete({_id: req.params.id})
            .then(animal => res.json(animal))
            .catch(err => res.status(400).json(err))
    }
}