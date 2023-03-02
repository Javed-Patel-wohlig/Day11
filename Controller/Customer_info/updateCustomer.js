const Customer = require("../../Models/customerSchema");

updateCustomer = async (req, res) => {
  try {
    let id = req.body.id;
    let existingCustomer = await Customer.findOne({ _id: id });

    if (!existingCustomer)
      return res.status(404).send({ message: "Customer not found" });

    existingCustomer = await Customer.updateOne({ _id: id }, req.body);
    res.status(200).send({ message: "updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = updateCustomer;
