const mongoose = require('../Config/config')

module.exports = mongoose.model('myModel3', mongoose.Schema({
    name: String,
    url: String,
}, {timestamps: true}))

