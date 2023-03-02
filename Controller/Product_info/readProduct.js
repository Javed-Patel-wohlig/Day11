const Product = require("../../Models/productSchemas");

readProductHandler = async (req, res) => {
  try {
    const result = await Product.find();
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = readProductHandler;
