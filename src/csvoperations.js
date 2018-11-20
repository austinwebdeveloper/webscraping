const fs = require('fs-extra');
const parser = require('csv-parser');
const path = require('path');
const async = require('async');

// async function readCSV() {
// 	new Promise((resolve, reject) => {
// 		const filepath = path.resolve('src/input_csv.csv');
// 		const readstream = fs.createReadStream(filepath);
// 		const stream = readstream.pipe(parser());
// 		let productIds = [];
// 		stream.on('data', data => {
// 			productIds.push(data.SourceProductId);
// 			console.log('SourceProductId', data.SourceProductId);
// 		});
// 		stream.on('end', () => {
// 			console.log(productIds);
// 		});
// 		if (productIds.length > 0) resolve(productIds);
// 		else reject('no products found');
// 	});
// }

function readCSV() {
	return new Promise(async resolve => {
		const filepath = path.resolve('src/input_csv.csv');
		const readstream = await fs.createReadStream(filepath);
		const stream = await readstream.pipe(parser());
		let productIds = [];
		await stream.on('data', data => {
			productIds.push(data.SourceProductId);
			// console.log('SourceProductId', data.SourceProductId);
		});
		await stream.on('end', () => {
			// console.log(productIds);
			resolve(productIds);
		});
		if (productIds.length > 0) return productIds;
		else return 'no products found';
	});
}

async function writeCSV(productId, availability) {
	const writestream = fs.createWriteStream('src/products-availability.csv', {
		flags: 'a',
	});
	// writestream.write('productID, Availability\r\n');
	const newLine = '\r\n';
	const line = `${productId}, ${availability}${newLine}`;
	if (writestream.write(line)) return 'CSV updated';
}

module.exports.readCSV = readCSV;
module.exports.writeCSV = writeCSV;
