const Order = require("../../Models/orderSchemas");

checkStatus = async (req, res) => {
  try {
    const pipeline = [
        {
            $lookup: {
              from: "payments",
              localField: "pay",
              foreignField: "_id",
              as: "payment_info"
            }
          },
          {
            $addFields: {
              paid_amount: {
                $sum: "$payment_info.paid_now"
              },
              pending_amount: {
              
                 $subtract: ["$total", { $sum: "$payment_info.paid_now" }] 
                
              }
            }
          },
          {
            $project: {
              _id: 0,
              customer: 1,
              pay_status: { $cond : {
                if:{$eq : ['$pending_amount',0]},
                then: 'paid',
                else: 'pending'
              }},
              paid_amount: 1,
              pending_amount: 1,
              total_amount: "$total"
            }
          },
          {
            $group: {
              _id: "$customer",
              count: { $sum: 1 },
              total_paid: { $sum: "$paid_amount" },
              total_pending: { $sum: "$pending_amount" },
              total_amount: { $sum: "$total" },
              orders: { $push: "$$ROOT" },
              
            },
          },
          {
            $addFields: {
              pay_status: {
                $cond: {
                  if: { $eq: ["$total_pending", 0] },
                  then: "paid",
                  else: "pending"
                }
              }
            }
          }
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
