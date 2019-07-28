const async = require("async");
var mysql = require("mysql");
// const { getAvailablity } = require("./lowes");
const { getProductDetails } = require("./brother-usa");
const { readCSV, writeCSV } = require("./csvoperations");
const { writeJson } = require("./jsonoperations");

async function main() {
  const productIds = await readCSV();
  console.log(productIds);
  for (const productId of productIds) {
    console.log("Start:", productId);
    // let availability = await getAvailablity(productId);
    // await writeCSV(productId, availability);
    const product = await getProductDetails(productId);
    console.log("result:", product);
    await writeJson(product);
  }
}
if (typeof require !== "undefined" && require.main === module) main();
