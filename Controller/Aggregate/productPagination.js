const Product = require("../../Models/productSchemas");

product_pagination = async (req, res) => {
  try {
    const page = req.body.page;
    const limit = req.body.limit;
    const skip = (page - 1) * limit;

    const pipeline = [
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },
            { $project: { name: 1, _id: 0 } },
          ],
          total: [{ $count: "total" }],
        },
      },
    ];

    const result = await Product.aggregate(pipeline);
    const products = result[0].data;
    const total = result[0].total[0].total;

    res.status(200).send({
      message: "Products fetched successfully",
      total: total,
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
