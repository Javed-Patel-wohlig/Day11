const getOneProduct = require("../../Controller/Product_info/getOneProduct");
const router = require("express").Router();

router.get("/", getOneProduct);

module.exports = router;
