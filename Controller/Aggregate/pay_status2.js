const Order = require("../../Models/orderSchemas");

checkStatus = async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "payments",
          localField: "pay",
          foreignField: "_id",
          as: "payment_info",
        },
      },
      {
        $addFields: {
          paid_amount: {
            $sum: "$payment_info.amount",
          },
          pending_amount: {
            $subtract: ["$total", { $sum: "$payment_info.amount" }],
          },
        },
      },
      {
        $project: {
          _id: 0,
          customer: 1,
          pay_status: { $arrayElemAt: ["$payment_info.pay_status", 0] },
          paid_amount: 1,
          pending_amount: 1,
          total_amount: "$total",
        },
      },
     
    ];

    const result = await Order.aggregate(pipeline);
    const count = result.length;

    res.status(200).send({
      count: count,
      data: result,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = checkStatus;
