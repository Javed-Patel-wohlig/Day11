const deleteProductHandler = require("../../Controller/Product_info/deleteProduct");
const router = require("express").Router();

router.delete("/", deleteProductHandler);

module.exports = router;
