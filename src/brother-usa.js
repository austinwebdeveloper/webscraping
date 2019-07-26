const puppeteer = require("puppeteer");
const { writeLog } = require("./logger");

async function getProductDetails(productId) {
  const productURL = `https://www.brother-usa.com/products/${productId}`;
  let product = {};
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    const response = await page.goto(productURL, { waitUntil: "networkidle2" });
    // console.log("response.headers", response._status);
    if (response._status !== 200) {
      writeLog(`${productId} : ${response._status}`);
      browser.close();
      return {};
    }
    await page.screenshot({ path: "brother-usa-screenshots/hll6200dw.png" });
    console.log("==============id================");

    await page.waitForSelector(".product-details .product-meta h1");
    const text = await page.evaluate(async () => {
      return await document.querySelector(".product-details .product-meta h1")
        .innerText;
    });
    console.log("id:", text);
    product = {
      ...product,
      id: text
    };
    console.log("==============title================");
    await page.waitForSelector(".product-details .product-meta h2");
    const title = await page.evaluate(async () => {
      return await document.querySelector(".product-details .product-meta h2")
        .innerText;
    });
    console.log("title:", title);
    product = {
      ...product,
      title
    };
    console.log("===============shortdescription===============");
    let shortDesc;
    try {
      await page.waitForSelector(".product-details .product-copy");
      shortDesc = await page.evaluate(async () => {
        return await document.querySelector(".product-details .product-copy")
          .innerHTML;
      });
    } catch (e) {
      shortDesc = "";
    }
    console.log("shortDesc:", shortDesc);
    product = {
      ...product,
      shortDesc
    };
    console.log("==============price================");
    let price;
    try {
      await page.waitForSelector(
        ".product-details-container .price-container span"
      );
      price = await page.evaluate(async () => {
        return await document.querySelector(
          ".product-details-container .price-container span"
        ).innerText;
      });
    } catch (e) {
      shortDesc = "";
    }
    console.log("price:", price);
    product = {
      ...product,
      price
    };
    console.log("==============overview================");
    let overview;
    try {
      await page.waitForSelector(".tab-content #overview");
      overview = await page.evaluate(async () => {
        return await document.querySelector(".tab-content #overview").innerHTML;
      });
    } catch (e) {
      overview = "";
    }
    // console.log("overview:", overview);
    product = {
      ...product,
      overview
    };
    console.log("==============specifications================");
    let specifications;
    try {
      await page.waitForSelector(".tab-content #specifications");
      specifications = await page.evaluate(async () => {
        return await document.querySelector(".tab-content #specifications")
          .innerHTML;
      });
    } catch (e) {
      specifications = "";
    }
    // console.log("specifications:", specifications);
    product = {
      ...product,
      specifications
    };
    console.log("==============images================");
    await page.waitForSelector(".slide-item");
    const images = await page.$$eval(".slide-item img[src]", imgs =>
      imgs.map(img => img.getAttribute("src"))
    );
    // console.log("images:", images);
    product = {
      ...product,
      images
    };
    await browser.close();
    return product;
  } catch (error) {
    console.log("catched error:", error);
    writeLog(`${productId} : error`);
    await browser.close();
    return "Something went wrong";
  }
}

// export { getAvailablity };
// export default { getAvailablity };
module.exports.getProductDetails = getProductDetails;
