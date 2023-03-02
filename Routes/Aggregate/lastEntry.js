const lastEntry = require('../../Controller/Aggregate/lastEntry');
const router = require('express').Router();


router.post('/', lastEntry)

module.exports = router;