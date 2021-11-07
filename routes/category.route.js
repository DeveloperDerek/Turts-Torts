const categoryController = require("../controllers/category.controller");
const router = require("express").Router();

router.post("/create", categoryController.create);
router.get("/getall", categoryController.getAll);
router.delete("/delete/:id", categoryController.delete);
router.put("/update/:id", categoryController.update);
router.post("/add-product", categoryController.addProduct);
router.post("/remove-product", categoryController.removeProduct);
router.get("/view-products/:id", categoryController.viewProducts);

module.exports = router;