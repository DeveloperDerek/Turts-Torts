const contactController = require("../controllers/contact.controller");
const router = require("express").Router();

router.post("/submit", contactController.submit);
router.get("/getall", contactController.getAll);
router.get("/getall/:email", contactController.search);

module.exports = router;