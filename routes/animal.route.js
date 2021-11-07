const animalController = require("../controllers/animal.controller");
const router = require("express").Router();

router.post("/create", animalController.create);
router.get("/view/:id", animalController.findOne);
router.get("/all", animalController.findAll);
router.get("/all/:name", animalController.search);
router.post("/update/:id", animalController.update);
router.delete("/delete/:id", animalController.delete);

module.exports = router;