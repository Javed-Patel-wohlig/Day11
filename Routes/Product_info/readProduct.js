const readProductHandler = require("../../Controller/Product_info/readProduct");
const router = require("express").Router();

router.get("/", readProductHandler);

module.exports = router;
