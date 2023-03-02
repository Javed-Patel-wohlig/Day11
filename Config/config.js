const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';
const dbName = 'Ecomerce';

mongoose.connect(`${url}/${dbName}`, {useNewUrlParser: true}, (err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err.message);
  } else {
    console.log('Connected to MongoDB');
  }
});


module.exports = mongoose;