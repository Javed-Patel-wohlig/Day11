const product_pagination = require('../../Controller/Aggregate/productPagination');
const router = require('express').Router();


router.post('/',product_pagination)

module.exports = router;