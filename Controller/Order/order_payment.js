const Order = require("../../Models/orderSchemas");
const Payment = require("../../Models/paymentSchemas");
const Product = require("../../Models/productSchemas");
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
    const product_info = await Product.findById({ _id: req.body.product });

    let size =  product_info.size
    let colors = product_info.colors
    let amount = product_info.price

    req.body.size = size;
    req.body.colors = colors;
    req.body.amount = amount;

    if (req.body.quantity > 1){
      req.body.amount = amount * req.body.quantity;
      req.body.total = total * req.body.total;
    }

    let order = new Order(_.pick(req.body, ["customer", "product", "o_date_time","deliveryStatus","quantity","colors","size","amount","tax","total"]));
    let payment = new Payment(_.pick(req.body, ["amount","pay_type","pay_status","customer","o_date_time","tax","total"]));

    order = await order.save();
    payment.order = order._id;
    
    payment = await payment.save();

    order.pay = payment._id;
    order = await order.save();
    
    console.log(order, payment);
    res.status(200).send({ order, payment });
    
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = order_payment;
