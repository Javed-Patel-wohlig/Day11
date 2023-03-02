const Product = require("../../Models/productSchemas");

updateCustomer = async (req, res) => {
  try {
    let id = req.body.id;
    let existingProduct = await Product.findOne({ _id: id });

    if (!existingProduct)
      return res.status(404).send({ message: "Customer not found" });

    existingProduct = await Product.updateOne({ _id: id }, req.body);
    res.status.send({ message: "updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = updateCustomer;
