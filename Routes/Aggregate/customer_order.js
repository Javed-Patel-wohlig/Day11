const checkStatus = require('../../Controller/Aggregate/customer_order');
const router = require('express').Router();


router.post('/', checkStatus)

module.exports = router;