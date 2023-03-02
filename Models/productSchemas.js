const mongoose = require("mongoose");
const category = require("./category");

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  colors: [
    String
  ],
  size: [
      String,
     ],
  material: {
    type: String,
    required: true,
  },
  categories : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  }
},{timestamps: true});

module.exports = mongoose.model("Product", productSchema);
