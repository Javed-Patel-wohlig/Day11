const searchCustomers = require("../../Controller/Pagination/pagination_customer_keyword");
const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
      const { keyword, pageNumber, pageSize } = req.body;
      const result = await searchCustomers(keyword, pageNumber, pageSize);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error searching customers.' });
    }
  });

module.exports = router;


