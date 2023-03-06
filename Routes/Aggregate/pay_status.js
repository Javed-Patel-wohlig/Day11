const checkStatus = require('../../Controller/Aggregate/pay_status');
const router = require('express').Router();


router.post('/', checkStatus)

module.exports = router;