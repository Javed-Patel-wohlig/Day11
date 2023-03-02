const updateCustomer = require("../../Controller/Customer_info/updateCustomer");
const router = require("express").Router();

router.put("/", updateCustomer);

module.exports = router;
