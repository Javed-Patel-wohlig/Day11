const updateProductHandler = require("../../Controller/Product_info/updateProduct");
const router = require("express").Router();

router.put("/", updateProductHandler);

module.exports = router;
