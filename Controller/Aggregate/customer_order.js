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
      {$unwind:'$payment_info'},
      {
        $group: {
          _id: "$customer",
          total_amount: { $sum: "$total" },
          paid_total: {
            $sum: {
              $cond: [
                { $eq: ["$payment_info.pay_status", "Paid"] },
                "$payment_info.total",
                0,
              ],
            },
          },
          paid_ordercount: {
            $sum: {
              $cond: [
                { $eq: ["$payment_info.pay_status", "Paid"] },
                1,
                0,
              ],
            },
          },
          unpaid_total: {
            $sum: {
              $cond: [
                { $eq: ["$payment_info.pay_status", "Unpaid"] },
                "$payment_info.total",
                0,
              ],
            },
          },
          unpaid_ordercount: {
            $sum: {
              $cond: [                                                                                                                                            
                { $eq: ["$payment_info.pay_status", "Unpaid"] },
                1,
                0,
              ],
            },
          },
        },   
      },
      {
        $project: {
          customer: "$_id",
          _id: 0,
          paid: {
            total: "$paid_total",
            status: "paid",
            ordercount: "$paid_ordercount",
          },
          unpaid: {
            total: "$unpaid_total",
            status: "pending",
            ordercount: "$unpaid_ordercount",
          },
          total_amount: 1,
          pay_status: {
            $cond: {
              if: { $eq: ["$unpaid_total", 0] },
              then: "paid",
              else: "pending",
            },
          },
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
