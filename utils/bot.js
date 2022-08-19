import puppeteer from "puppeteer";
import checkLoading from "./checkLoading.js";
import pageContent from "./pageContent.js";
import getImages from "./getImages.js";
import getLinks from "./innerLinks.js";

const bot = async (url) => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: ["--no-sandbox", "--headless"],
  });
  const page = await browser.newPage();
  await page.goto(url);

  const loadingTime = await checkLoading(page);

  const details = await pageContent(page);

  const images = await getImages(page);

  const innerLinks = await getLinks(page);

  await browser.close();
  return {
    loadingTime,
    details,
    images,
    innerLinks,
  };
};

export default bot;
