const createCustomer = require("../../Controller/Customer_info/createCustomer");
const router = require("express").Router();

router.post("/", createCustomer);

module.exports = router;
