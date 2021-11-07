const orderController = require("../controllers/order.controller");
const jwtAuth = require("../configs/jwt");
const router = require("express").Router();

router.post("/addOrderItem", jwtAuth, orderController.createOrder).get(jwtAuth, orderController.getOrders);
router.post("/createOrder", jwtAuth, orderController.createOrder);
router.get("/getOrder", jwtAuth, orderController.getOrders);
router.get("/view/:id", orderController.viewOrder);
router.put("/update/:id", orderController.setStatus);
router.get("/all/:status/:min/:max/:end", orderController.search);

module.exports = router;