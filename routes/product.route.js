const productController = require("../controllers/product.controller");
const router = require("express").Router();

router.post("/create/", productController.create);
router.get("/view/:id", productController.findOne);
router.get("/all", productController.findAll);
router.get("/all/:title", productController.searchAll);
router.put("/update/:id", productController.update);
router.delete("/delete/:id", productController.delete);

module.exports = router;