const thirdPartyRecursive = require('../../Controller/Recursion/recursion3')
const router = require("express").Router();

router.post('/',thirdPartyRecursive);

module.exports = router;