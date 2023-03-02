const searchingCustomer = require("../../Controller/Customer_info/searchCustomer");
const router = require("express").Router();

router.get("/", searchingCustomer);

module.exports = router;
