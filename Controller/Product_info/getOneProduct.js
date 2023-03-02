const Product = require("../../Models/productSchemas");

getOneProduct = async (req, res) => {
  try {
    const result = await Product.find({_id:req.body.id});
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = getOneProduct;
