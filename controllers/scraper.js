import bot from "../utils/bot.js";
import checkRobots from "../utils/checkRobots.js";
import checkSSL from "../utils/checkSSL.js";
import getMainContent from "./getMainContent.js";
import saveData from "./saveData.js";
import { getLinks, updateDate, deleteLink } from "./links.js";
import parser from "./parser.js";
import isImgUrl from "../utils/isImgUrl.js";

let lastMonthURLs = [];

const scraper = async () => {
  if (lastMonthURLs.length === 0) {
    lastMonthURLs = await getLinks();
    console.log("fetched from the database");
    console.log(lastMonthURLs);
  }

  for (let i = 0; i < lastMonthURLs.length; i++) {
    const url = lastMonthURLs[i].url;
    console.log(url);

    if (isImgUrl(url)) {
      await deleteLink(url);
      continue;
    }

    if (checkSSL(url)) {
      const canCrawl = await checkRobots(url); // Check if the url is allowed to crawl

      // get the page content and images from the url if allowed to crawl
      if (canCrawl) {
        try {
          const data = await bot(url);
          const refinedData = parser(data);
          const mainData = getMainContent(refinedData);

          await saveData(data, mainData, url);
        } catch (error) {
          console.log(error);
        } finally {
          console.log("done");
        }
      }
    } else {
      console.log("Not allowed to crawl");
    }

    // update the last updated date of the url
    await updateDate(lastMonthURLs[i]._id);

    //finally remove the url from the array
    lastMonthURLs = lastMonthURLs.filter((u) => u !== lastMonthURLs[i]);
  }

  // recursion
  // scraper();
};

export default scraper;
