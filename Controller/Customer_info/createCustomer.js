const Customer = require("../../Models/customerSchema");

createCustomer = async (req, res) => {
  try {
    let email = req.body.email;
    const existingProduct = await Customer.findOne({ email: email });

    if (existingProduct)
      return res.status(409).send({ message: "Customer already exists" });

    let customer = new Customer(req.body);
    customer = await customer.save();
    res.status(200).send({message: "Created Customer successfully"});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = createCustomer;
