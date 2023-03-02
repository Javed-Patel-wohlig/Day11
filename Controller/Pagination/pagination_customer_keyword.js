const Customer = require('../../Models/customerSchema')

searchCustomers = async (keyword, pageNumber, pageSize) => {
  const skip = (pageNumber - 1) * pageSize;

  const customers = await Customer.find({
    name: { $regex: keyword, $options: "i" },
  })
    .skip(skip)
    .limit(pageSize);

  const totalCustomers = await Customer.countDocuments({
    name: { $regex: keyword, $options: "i" },
  });

  const totalPages = Math.ceil(totalCustomers / pageSize);

  return {
    customers,
    totalCustomers,
    totalPages,
  };
};

module.exports = searchCustomers;
