const puppeteer = require('puppeteer');

async function getAvailablity(productId) {
	const productURL = `https://www.lowes.com/pd/-/${productId}`;
	try {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.setViewport({ width: 1366, height: 768 });
		await page.goto(productURL, { waitUntil: 'networkidle2' });
		await page.screenshot({ path: 'screenshots/lowes1.png' });
		await page.waitFor('input#zipcode-input.form-control.js-zipcode-input.met-zip-code');
		await page.$eval('input#zipcode-input.form-control.js-zipcode-input.met-zip-code', el => (el.value = '78717'));
		await page.deleteCookie(...(await page.cookies('https://www.lowes.com')));
		await page.click('button.met-zip-submit');
		await page.waitFor(
			'.modal  .modal-content  .js-SL-modal-body  .modal-body  .js-SL-list ul li:nth-child(1)  .media  .media-right  button.js-store-locator-select-store'
		);
		await page.click(
			'.modal  .modal-content  .js-SL-modal-body  .modal-body  .js-SL-list ul li:nth-child(1)  .media  .media-right  button.js-store-locator-select-store'
		);
		await page.screenshot({ path: 'screenshots/lowes2.png' });
		await page.waitForSelector('.pd-shipping-delivery .fulfillment-method-head h4');
		const text = await page.evaluate(async () => {
			return await document.querySelector('.pd-shipping-delivery .fulfillment-method-head h4').innerText;
		});
		console.log('Availablity:', text);
		await browser.close();
		return text;
	} catch (error) {
		console.log('catched error:', error.TimeoutError);
		await browser.close();
		return 'Something went wrong';
	}
}

// export { getAvailablity };
// export default { getAvailablity };
module.exports.getAvailablity = getAvailablity;
