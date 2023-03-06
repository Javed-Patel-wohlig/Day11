const Order = require("../../Models/orderSchemas");

lastEntry = async (req, res) => {
  try {
    const pipeline = [
      // Group orders by customer
      { $group: { _id: "$customer", latest_order: { $max: "$o_date_time" } } },
      // Sort orders by date in descending order to get latest order
      { $sort: { latest_order: -1 } },
      // Limit results to 1 per customer
      { $group: { _id: "$_id", latest_order: { $first: "$latest_order" } } },
      // Lookup customer by _id
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      // Unwind the customer array
      { $unwind: "$customer" },
      // Lookup the latest order by customer and o_date_time
      {
        $lookup: {
          from: "orders",
          let: { customer_id: "$_id", latest_order: "$latest_order" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$customer", "$$customer_id"] },
                    { $eq: ["$o_date_time", "$$latest_order"] },
                  ],
                },
              },
            },
          ],
          as: "latest_order",
        },
      },
      // Unwind the latest_order array
      { $unwind: "$latest_order" },
      // Project customer name and latest order fields
      { $project: { name: "$customer.name", latest_order: "$latest_order" } },
    ];

    const pipeline2 = [
      { $sort: { o_date_time: -1}},
      { $group: { _id: "$customer", latest_order: {$first: '$$ROOT'} }},
      { $lookup: 
        { 
          from:'customers',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
         }
      },
      { $unwind: '$user' },
      { $project: { name: '$user.name', latest_order: 1 } },
      
    ]

    const result = await Order.aggregate(pipeline);
    const count = result.length;

    // const populatedResult = await Customer.populate(result, { path: 'order' });

    res.status(200).send({
      count: count,
      data: result,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = lastEntry;
