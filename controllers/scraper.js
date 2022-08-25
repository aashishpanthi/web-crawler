import bot from "../utils/bot.js";
import checkRobots from "../utils/checkRobots.js";
import checkSSL from "../utils/checkSSL.js";
import getMainContent from "./getMainContent.js";

import parser from "./parser.js";

const scraper = async (url) => {
  if (checkSSL(url)) {
    const canCrawl = await checkRobots(url); // Check if the url is allowed to crawl

    // get the page content and images from the url if allowed to crawl
    if (canCrawl) {
      try {
        const data = await bot(url);
        const refinedData = parser(data);
        const mainData = getMainContent(refinedData);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("done");
      }
    }
  } else {
    console.log("Not allowed to crawl");
  }
};

export default scraper;
