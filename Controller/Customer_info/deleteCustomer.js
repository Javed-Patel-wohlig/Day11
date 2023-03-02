const Customer = require("../../Models/customerSchema");

deleteCustomer = async (req, res) => {
  try {
    let id = req.body.id;
    let existingCustomer = await Customer.findOne({ _id: id });

    if (!existingCustomer)
      return res.status(404).send({ message: "Customer not found" });

    await Customer.deleteOne({ _id: id });
    res.json({message: "deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = deleteCustomer;
