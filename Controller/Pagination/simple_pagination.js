const Customer = require("../../Models/customerSchema");

simplePagination = (req, res) => {
  const page = req.body.page || 1;
  const limit = req.body.limit || 10;
  const skip = (page - 1) * limit;

  Customer.find()
    .skip(skip)
    .limit(limit)
    .exec((err, customers) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
      }

      return res.status(200).json(customers);
    });
};

module.exports = simplePagination;
