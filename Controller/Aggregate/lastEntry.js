const Customer = require("../../Models/customerSchema");
const Order = require("../../Models/orderSchemas");
const mongoose = require("../../Config/config");

lastEntry = async (req, res) => {
    try {
        const pipeline =[
            { $match: {  } },
        ]
        const result = await Customer.aggregate(pipeline);
        const count = result.length;
    
        const populatedResult = await Customer.populate(result, { path: 'order' });
    
        res.status(200).send({
          count: count,
          data: populatedResult
        });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
}

module.exports = lastEntry;
