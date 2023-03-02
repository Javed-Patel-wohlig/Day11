const getOneCustomer = require("../../Controller/Customer_info/getOneCustomer");
const router = require("express").Router();

router.get("/", getOneCustomer);

module.exports = router;
