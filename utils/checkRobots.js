import robotsParser from "robots-txt-parser";
const robots = robotsParser();

// check the robots.txt file for the given url and return true if it is allowed to crawl the url

const checkRobots = async (url) => {
  await robots.useRobotsFor(url);
  if (await robots.canCrawl(url)) {
    return true;
  } else {
    return false;
  }
};

export default checkRobots;
