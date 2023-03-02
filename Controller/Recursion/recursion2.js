const myModel = require("../../Models/myModelSchema");
const myModel2 = require("../../Models/myModel2Schema");
const _ = require("lodash");

simpleRecursion = async (req, res) => {
    try {
      var CHUNK = 200;
      const myModelData = await myModel.find();
      let bulk = _.chunk(myModelData, CHUNK);
      let bulk_len = bulk.length
      console.log(`bulk length is ${bulk_len}`);
  
      const recursiveInsert = async (count) => {
        if (bulk_len === 0) return
  
        const result = bulk[count].map((item) => {
          return {
            insertOne: {
              document: {
                name: item.name,
                email: item.email,
                phone: item.phone,
                address: item.address,
                dob: item.dob,
                password: item.password,
              },
            },
          };
        });
  
        myModel2.bulkWrite(result);
        console.log(`Inserted ${CHUNK} records`);
        bulk_len--;
        await recursiveInsert(count+1);
      };
  
      await recursiveInsert(0);
      res.send("Bulk for second recursion is Write Success");
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  }

module.exports = simpleRecursion
  