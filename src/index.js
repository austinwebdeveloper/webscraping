const async = require("async");
var mysql = require("mysql");
const fs = require("fs");
// const { getAvailablity } = require("./lowes");
const { getProductDetails } = require("./brother-usa");
const { readCSV, writeCSV } = require("./csvoperations");

async function main() {
  const productIds = await readCSV();
  console.log(productIds);
  for (const productId of productIds) {
    console.log(productId);
    // let availability = await getAvailablity(productId);
    // await writeCSV(productId, availability);
    const product = await getProductDetails(productId);
    console.log(product);
  }

  //   var connection = mysql.createConnection({
  //     connectionLimit: 100,
  //     host: "152.44.37.131",
  //     port: 3306,
  //     user: "ingramt_db_user",
  //     password: "GbNwzzc2RTyQ=N7-SIOe_52IoC*XEecQ",
  //     database: "ingramt_db"
  //   });
  //   connection.connect();
  //   connection.query("SELECT 1 + 1 AS solution", function(
  //     error,
  //     results,
  //     fields
  //   ) {
  //     if (error) throw error;
  //     console.log("The solution is: ", results[0].solution);
  //   });

  const product = await getProductDetails("hll6200dw");
  console.log(product);
  let student = {
    name: "Mike",
    age: 23,
    gender: "Male",
    department: "English",
    car: "Honda"
  };

  let data = JSON.stringify(student);
  fs.writeFileSync("student-2.json", data);

  // connection.end();
}
if (typeof require !== "undefined" && require.main === module) main();
