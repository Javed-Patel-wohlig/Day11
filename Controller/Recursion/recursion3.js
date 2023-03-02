const myModel3 = require("../../Models/myModel3Schema");
const axios = require("axios");

const url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";

const thirdPartyRecursive = async (req, res) => {
  try {
    let totalPages = 10;
    let currentPage = 0;
    let next = url;

    async function RecursiveInsert() {
      if (currentPage >= totalPages) return;

      try {
        const response = await axios.get(next);
        const result = response.data.results;
        const count = response.data.count;
        const pageSize = 100;
        totalPages = Math.ceil(count / pageSize);
        next = response.data.next;

        const bulk = result.map((item) => {
          return {
            insertOne: {
              document: {
                name: item.name,
                url: item.url,
              },
            },
          };
        });

        await myModel3.bulkWrite(bulk);

        console.log(
          `Inserted ${bulk.length} items from page ${
            currentPage + 1
          } of ${totalPages}`
        );
        if(next === null){
            console.log('All the pages are done');
        }
        
        if(next != null){
            console.log(`Next page: ${next}`);
            currentPage++;
            await RecursiveInsert();
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
      }
    }

    await RecursiveInsert();
    res.status(200).send("Data inserted successfully.");
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = thirdPartyRecursive;
