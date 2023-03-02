const simpleRecursion = require('../../Controller/Recursion/recursion2')
const router = require("express").Router();

router.post("/", simpleRecursion);

module.exports = router;
