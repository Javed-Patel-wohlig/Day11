const order_payment = require("../../Controller/Order/order_payment");
const router = require("express").Router();

router.post("/", order_payment);

module.exports = router;
