const myModel = require("../../Models/myModelSchema");
const myModel2 = require("../../Models/myModel2Schema");
const _ = require("lodash");

paginate_recursion = async (req, res) => {
  try {
    var CHUNK = 200;
    const myModelData = await myModel.find();
    let bulk = _.chunk(myModelData, CHUNK);
    let bulk_len = bulk.length;

    console.log(`bulk length is ${bulk_len}`);

    const recursiveInsert = async (count) => {
      if (bulk_len === 0) return;
      
      async function recursiveAdd(pageNumber){
        
        const bulk_data = bulk[count]
        const bulk_data_len = bulk_data.length
        const total_pages = Math.ceil(bulk_data_len/req.body.pageSize)

        if (pageNumber > total_pages) return;
        
        const skip = (pageNumber- 1) * req.body.pageSize;
        const data = bulk_data.slice(skip, skip + req.body.pageSize);
        
        const result = data.map((item) => {
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
        console.log(`Inserted ${req.body.pageSize} records `);
        await recursiveAdd(pageNumber+1)
      }  
      recursiveAdd(1)


      bulk_len--;
      await recursiveInsert(count + 1);
    };

    await recursiveInsert(0);
    res.send("Bulk for first recursion is Write Success");
    console.log(`Bulk for first recursion is Write Success with  pages `);

  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = paginate_recursion;
