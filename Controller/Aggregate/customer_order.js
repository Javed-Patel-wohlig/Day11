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
          $project: {
            customer: 1,
            total: 1,
            paid_amount: {
              $cond: {
                if: { $eq: ["$payment_info.pay_status", "Paid"] },
                then: { $sum: "$payment_info.total" },
                else: 0,
              },
            },
            pending_amount: {
              $cond: {
                if: { $eq: ["$payment_info.pay_status", "Paid"] },
                then: 0,
                else: { $sum: "$payment_info.total" },
              },
            },
          },
        },
        {
          $group: {
            _id: "$customer",
            paid_amount: { $sum: "$paid_amount" },
            pending_amount: { $sum: "$pending_amount" },
            total_amount: { $sum: "$total" },
            pay_status: {
              $cond: {
                if: { $eq: ["$pending_amount", 0] },
                then: "paid",
                else: "pending",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            customer: "$_id",
            paid_amount: 1,
            pending_amount: 1,
            total_amount: 1,
            pay_status: 1,
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
