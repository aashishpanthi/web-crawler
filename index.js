import bot from "./utils/bot.js";
import checkRobots from "./utils/checkRobots.js";

const url = "https://aashishpanthi.info.np";

// Check if the url is allowed to crawl
const canCrawl = await checkRobots(url);

// get the page content and images from the url if allowed to crawl
if (canCrawl) {
  bot(url)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("done");
    });
}
