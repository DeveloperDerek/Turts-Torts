const Mongoose = require("mongoose");

const animalSchema = new Mongoose.Schema(
    {
        category: {
            type: String,
            required: true
        },
        commonName: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        origin: {
            type: String
        },
        diet: {
            type: String
        },
        size: {
            type: String
        },
        lifespan: {
            type: String
        },
        care: {
            type: String
        },
        imageKey: {
            type: String
        }
    }
)

const Animal = Mongoose.model("Animal", animalSchema);

module.exports = Animal;