const Customer = require("../../Models/customerSchema");

searchingCustomer = (req, res) => {
  const keyword = req.body.keyword;

  Customer.find(
    { name: { $regex: keyword, $options: "i" } },
    (err, customers) => {
      if (err) {
        res.status(500).send(err.message);
        console.log(err);
        return;
      }
      res.status(200).send(customers);
      console.log(customers);
    }
  );
};

module.exports = searchingCustomer;
