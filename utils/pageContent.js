import puppeteer from "puppeteer";

// scrape the title, meta description, headings and the content of the website
const scrape = async (page, browser) => {
  // get the title of the page
  const title = await page.title();

  // get the meta description of the page
  const metaDescription = await page.$eval(
    "meta[name=description]",
    (el) => el.content
  );

  // get the headings of the page
  const headings = await page.$$eval("h1, h2, h3, h4", (els) =>
    els.map((el) => el.textContent)
  );

  //get the favicon of the website
  const favicon = await page.evaluate(() => {
    const favicon = document.querySelector("link[rel*='icon']");
    return favicon.href;
  });

  //get the og photo of the website
  const ogPhoto = await page.evaluate(() => {
    const ogPhoto = document.querySelector("meta[property*='og:image']");
    return ogPhoto.content;
  });

  //get the og title of the website
  const ogTitle = await page.evaluate(() => {
    const ogTitle = document.querySelector("meta[property*='og:title']");
    return ogTitle.content;
  });

  //get the og description of the website
  const ogDescription = await page.evaluate(() => {
    const ogDescription = document.querySelector(
      "meta[property*='og:description']"
    );
    return ogDescription.content;
  });

  //get the og url of the website
  const ogUrl = await page.evaluate(() => {
    const ogUrl = document.querySelector("meta[property*='og:url']");
    return ogUrl.content;
  });

  //get the og type of the website
  const ogType = await page.evaluate(() => {
    const ogType = document.querySelector("meta[property*='og:type']");
    return ogType.content;
  });

  const ogDetails = {
    ogTitle,
    ogDescription,
    ogUrl,
    ogType,
    ogPhoto,
  };

  await browser.close();
  return { title, metaDescription, headings, ogDetails, favicon };
};

export default scrape;
