const fs = require("fs");

function writeJson(product) {
  //   let data = JSON.stringify(product);
  fs.readFile("products.json", function(err, data) {
    var json = JSON.parse(data);
    json.push(product);
    fs.writeFile("products.json", JSON.stringify(json), function(err) {
      if (err) console.log("writeJson err", err);
    });
  });
  return true;
}

module.exports.writeJson = writeJson;
