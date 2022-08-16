import bot from "./utils/bot.js";

const url = "https://www.aashishpanthi.info.np";

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
