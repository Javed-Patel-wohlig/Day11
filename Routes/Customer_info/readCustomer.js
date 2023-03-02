const readCustomer = require("../../Controller/Customer_info/readCustomer");
const router = require("express").Router();

router.get("/", readCustomer);

module.exports = router;
