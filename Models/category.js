const mongoose = require('mongoose')

const category = new mongoose.Schema({
    name:{
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model('Categories', category)