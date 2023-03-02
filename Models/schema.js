const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return passwordRegex.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid password! Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const registerSchema = new mongoose.Schema({
  name: {
    type: "string",
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return passwordRegex.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid password! Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.`,
    },
  },
  confirm_password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return passwordRegex.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid password! Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.`,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  manufacturer: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return passwordRegex.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid password! Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.`,
    },
  },
  createdAt: { type: Date, default: Date.now },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  status: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const cartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const addressSchema = new mongoose.Schema({
  address1: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
});

const paymentSchema = new mongoose.Schema({
  cardNumber: { type: "string", required: true },
  expiresAt: { type: "date", required: true },
  cvc: { type: "number", min: 3, max: 3, required: true },
  createdAt: { type: Date, default: Date.now },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
});

const WishlistSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  Customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
});

const searchSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const commetSchema = new mongoose.Schema({
  description: {
    type: String,
    minLength: 10,
    maxLength: 200,
    required: true,
  },
});

const reviewSchema = new mongoose.Schema({

  description: {
    type: String,
    minLength: 10,
    maxLength: 200,
    required: false,
  },
});

module.exports = {
  Product: mongoose.model("Product", productSchema),
  Customer: mongoose.model("Customer", customerSchema),
  Order: mongoose.model("Order", orderSchema),
  Login: mongoose.model("Login", loginSchema),
  Register: mongoose.model("Register", registerSchema),
  Cart: mongoose.model("Cart", cartSchema),
  Address: mongoose.model("Address", addressSchema),
  Payment: mongoose.model("Payment", paymentSchema),
  Wishlist: mongoose.model("Wishlist", WishlistSchema),
  Search: mongoose.model("Search", searchSchema),
  Comment: mongoose.model("Comment", commetSchema),
  Review: mongoose.model("Review", reviewSchema),
};
