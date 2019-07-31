const puppeteer = require("puppeteer");
const { writeLog } = require("./logger");

async function getProductDetails(productId) {
  const productURL = `https://www.brother-usa.com/products/${productId}`;
  let product = {
    id: productId
  };
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    const response = await page.goto(productURL, {
      waitUntil: "networkidle2",
      timeout: 3000000
    });
    // console.log("response.headers", response._status);
    if (response._status !== 200) {
      writeLog(`${productId} : ${response._status}`);
      browser.close();
      return { id: productId };
    }
    await page.screenshot({ path: `brother-usa-screenshots/${productId}.png` });
    console.log("==============id================");
    let pid;
    try {
      await page.waitForSelector(".product-details .product-meta h1");
      const pid = await page.evaluate(async () => {
        return await document.querySelector(".product-details .product-meta h1")
          .innerText;
      });
    } catch (e) {
      pid = "";
    }
    console.log("pid:", pid);
    product = {
      ...product,
      pid
    };
    console.log("==============title================");
    let title;
    try {
      await page.waitForSelector(".product-details .product-meta h2");
      const title = await page.evaluate(async () => {
        return await document.querySelector(".product-details .product-meta h2")
          .innerText;
      });
    } catch (e) {
      title = "";
    }
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
      overview = await formatCode(overview);
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
      specifications = await formatCode(overview);
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
      // imgs.map(img => img.getAttribute("src"))
      imgs.map(img => {
        if (img.getAttribute("src").includes("main-image_no-photo-01.png")) {
          return "";
        } else {
          return img.getAttribute("src");
        }
      })
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
    await browser.close();
    writeLog(`${productId} : error`);
    return { error: true };
  }
}

function formatCode(code) {
  rmNewlines = code.replace(/\n|\r/g, "");
  rmSpaces = rmNewlines.replace(/  +/g, "");
  return rmSpaces;
}

// export { getAvailablity };
// export default { getAvailablity };
module.exports.getProductDetails = getProductDetails;
