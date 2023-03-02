const Product = require('../../Models/productSchemas')
const categories = require('../../Models/category')

populateProduct = (req, res)=>{
   Product.findOne({ name: req.body.name })
  .populate('categories')
  .exec((err, product) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err.message);
      return;
    }
    res.status(200).send(product)
    console.log(product);
  });
}

module.exports = populateProduct