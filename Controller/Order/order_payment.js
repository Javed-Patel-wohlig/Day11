const Order = require("../../Models/orderSchemas");
const Payment = require("../../Models/paymentSchemas");
const _ = require("lodash");

order_payment = async (req, res) => {
  try {
    // let name = req.body.id;
    // const existingOrder = await Order.findOne({ _id: name });

    // console.log(existingOrder);

    // if (existingOrder.pay === req.body.pay) {
    //   const newQuantity =
    //     Number(existingOrder.quantity) + Number(req.body.quantity);
    //   await Order.findOneAndUpdate({ _id: name }, { quantity: newQuantity });

    //   const payment = await Payment.findOne(existingOrder.pay);
    //   if (payment.pay_status === true) {
    //     await Order.findOneAndUpdate(
    //       { _id: name },
    //       { o_date_time: Date.now() }
    //     );
    //   }

    //   const updatedOrderDetails = await Order.findOne({ _id: name });
    //   return res.status(200).json({
    //     updatedOrderDetails,
    //     message: `Quantity updated to ${newQuantity}`,
    //   });
    // }

    let one = Number(req.body.amount);
    let two = Number(req.body.tax);
    let total = one + two;

    req.body.total = Number(total);

    let order = new Order(_.pick(req.body, ["customer", "product", "o_date_time","deliveryStatus","quantity","colors","size","amount","tax","total"]));
    let payment = new Payment(_.pick(req.body, ["amount","pay_type","pay_status","customer","o_date_time","tax","total"]));

    order = await order.save();
    payment.order = order._id;
    
    payment = await payment.save();

    order.pay = payment._id;
    order = await order.save();
    
    console.log(order, payment);
    res.send({ order, payment });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = order_payment;
