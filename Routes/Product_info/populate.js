const populateProduct = require('../../Controller/Product_info/populate');
const router = require("express").Router();

router.get('/', populateProduct)

module.exports = router;