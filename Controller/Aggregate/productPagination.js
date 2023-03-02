const Product = require("../../Models/productSchemas");

product_pagination = async (req, res) => {
  try {
    const page = req.body.page;
    const limit = req.body.limit;
    const skip = (page - 1) * limit;

    const pipeline = [
      { $skip: skip },
      { $limit: limit },
      { $project: { name: 1, _id: 0 } },
    ];

    const products = await Product.aggregate(pipeline);

    res.status(200).send({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: "Error fetching products",
    });
  }
};

module.exports = product_pagination;
