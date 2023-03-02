const Customer = require("../../Models/customerSchema");

manyCustomer = async (req, res) => {
  try {
    const customers = req.body; 

    const existingCustomers = await Customer.find({ email : { $in: customers.map(c => c.email) } });
    if (existingCustomers.length > 0) {
      return res.status(409).json({ message: "Some of the customers already exist" });
    }

   // const customerDocs = customers.map(c => new Customer(c));

    const result = await Customer.insertMany(customers);

    res.status(200).send({message: "Inserted customer successfully"});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = manyCustomer;
