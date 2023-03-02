const Customer = require("../../Models/customerSchema");

getOneCustomer = async (req, res) => {
  try {
    const result = await Customer.findOne({ _id: req.body.id });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = getOneCustomer;
