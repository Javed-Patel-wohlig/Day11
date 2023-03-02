const paginate_recursion = require('../../Controller/Recursion/recursion1')
const router = require("express").Router();

router.post('/',paginate_recursion);

module.exports = router;