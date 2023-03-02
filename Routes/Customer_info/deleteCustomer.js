const deleteCustomer = require("../../Controller/Customer_info/deleteCustomer");
const router = require("express").Router();

router.delete("/", deleteCustomer);

module.exports = router;
