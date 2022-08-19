import bot from "./utils/bot.js";
import checkRobots from "./utils/checkRobots.js";

const url = "https://aashishpanthi.info.np";

const canCrawl = await checkRobots(url);

console.log(canCrawl);

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
