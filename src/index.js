const async = require('async');
const { getAvailablity } = require('./lowes');
const { readCSV, writeCSV } = require('./csvoperations');

async function main() {
	const productIds = await readCSV();
	// const productIds = ['1000050429', '1132353', '50041108'];
	console.log(productIds);
	for (const productId of productIds) {
		console.log(productId);
		let availability = await getAvailablity(productId);
		await writeCSV(productId, availability);
	}
}
if (typeof require !== 'undefined' && require.main === module) main();
