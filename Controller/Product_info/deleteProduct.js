const Product = require("../../Models/productSchemas");
deleteProductHandler = async (req, res) => {
  try {
    let id = req.body.id;
    let existingProduct = await Product.findOne({ _id: id });

    if (!existingProduct)
      return res.status(404).send({ message: "Product not found" });

    await Product.deleteOne({ _id: id });
    res.status(200).send({existingProduct, message: "deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = deleteProductHandler;
