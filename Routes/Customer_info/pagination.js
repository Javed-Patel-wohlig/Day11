const simplePagination = require("../../Controller/Pagination/simple_pagination");
const router = require("express").Router();

router.post("/", simplePagination);

module.exports = router;
