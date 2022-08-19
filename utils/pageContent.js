import getFavicon from "./scrapeContent/getFavicon.js";
import getMetaDetails from "./scrapeContent/getMetaDetails.js";
import getOGDetails from "./scrapeContent/getOGDetails.js";
import getTwitterDetails from "./scrapeContent/getTwitterDetails.js";

// scrape the title, meta description, headings and the content of the website
const scrape = async (page) => {
  const details = await getMetaDetails(page);

  // get the headings of the page
  const headings = await page.$$eval("h1, h2, h3, h4, h5, h6", (els) =>
    els.map((el) => el.textContent)
  );

  const favicon = await getFavicon(page);

  const ogDetails = await getOGDetails(page);

  const twitterDetails = await getTwitterDetails(page);

  return {
    title: details.title,
    metaDescription: details.description,
    favicon,
    keywords: details.keywords,
    ogDetails,
    headings,
    twitterDetails,
  };
};

export default scrape;
