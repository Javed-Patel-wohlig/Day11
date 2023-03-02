const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name:{
      type: String,
      required: true,
  },
  phone:{
      type: Number,
      required: true,
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
  dob:{
      type: String,
      required: true,
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
  address:{
      type: String,
      required: true,
  }
},{timestamps: true});

module.exports = mongoose.model('Customer', customerSchema);
