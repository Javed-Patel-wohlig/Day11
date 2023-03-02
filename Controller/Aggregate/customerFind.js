const Customer = require("../../Models/customerSchema");
const mongoose = require("../../Config/config");

customerFindAggregate = async (req, res) => {
  try {
    const pipeline =[
        { $match: { _id: mongoose.Types.ObjectId(req.body.id) } },
        { $project: { name: 1, _id:0 }}
    ]
    const result = await Customer.aggregate(pipeline);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = customerFindAggregate;
