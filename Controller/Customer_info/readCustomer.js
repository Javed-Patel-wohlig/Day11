const Customer = require("../../Models/customerSchema");

readCustomer = async (req, res) => {
  try {
    const result = await Customer.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = readCustomer;
