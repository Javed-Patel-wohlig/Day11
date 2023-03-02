const manyCustomer = require("../../Controller/Customer_info/manyCustomer");
const router = require("express").Router();

router.post("/", manyCustomer);

module.exports = router;
