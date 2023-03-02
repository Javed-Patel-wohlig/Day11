const customerFindAggregate = require('../../Controller/Aggregate/customerFind');
const router = require('express').Router();


router.post('/', customerFindAggregate)

module.exports = router;