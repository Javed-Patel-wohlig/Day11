const mongoose  = require('mongoose');
const Customer = require('./customerSchema');
const Order = require('./orderSchemas');


const paymentSchema = new mongoose.Schema({
    amount:{
        type: Number,
        required: true,
    },
    pay_type:{
        type: String,
        required: true,
    },
    pay_status:{
        type: Boolean,
        default: false,
        required: true,
    },
    order:{type: mongoose.Schema.Types.ObjectId, ref: Order},
   
    customer:{type: mongoose.Schema.Types.ObjectId, ref: Customer},
   
    pay_date_time:{
        type: Date,
        default: Date.now,
    },
    total:{
        type: Number,
        required: true,
    },
    tax:{
        type: Number,
        required: true,
    }
},{timestamps: true});

module.exports = mongoose.model('Payment', paymentSchema);