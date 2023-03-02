// const conn = require('./Config/config');
// const myModel = require('./Models/myModelSchema');  

// const data = [];
// for (let i = 0; i < 3000; i++) {
//   const name = `user${i + 1}`;
//   const email = `user${i + 1}@example.com`;
//   const obj = {
//     name: name,
//     phone: 9137761883,
//     email: email,
//     dob: "29-07-2000",
//     password: "1012154And26151",
//     address: "dsouza building, sakinaka, mumbai-400072"
//   };
//   data.push(obj);
// }

// myModel.insertMany(data, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res);
//   }
// });

// console.log(data);


const data = [{user:1},{user:2},{user:3},{user:4},{user:5}]
const count = data.length
console.log(count);
var pageSize = 2
var pageNumber = 3
var skip = (pageNumber - 1)* pageSize

var result = data.slice(skip, skip + pageSize)

console.log(result)

// function looping(count){
//   if(length === 0) return;
//   const result = data[count]
//   result.forEach((item)=> console.log(item.user)) 
//   console.log(result);

//   length--;
//   console.log(length); 
//   looping(count+1)
// }

// looping(0)