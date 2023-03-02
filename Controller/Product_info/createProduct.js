const Product = require("../../Models/productSchemas");

productHandler = async (req, res) => {
  try {
    let id = req.body.id;
    const existingProduct = await Product.findOne({ _id: id });

    if (existingProduct)
      return res.status(409).send({ message: "Product already exists" });

    let product = new Product(req.body);
    product = await product.save();
    res.status(200).send({message:"Product Created successfully"});
    console.log(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = productHandler;
