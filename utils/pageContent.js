import getFavicon from "./scrapeContent/getFavicon.js";
import getHeadings from "./scrapeContent/getHeadings.js";
import getMetaDetails from "./scrapeContent/getMetaDetails.js";
import getOGDetails from "./scrapeContent/getOGDetails.js";
import getTwitterDetails from "./scrapeContent/getTwitterDetails.js";

// scrape the title, meta description, headings and the content of the website
const scrape = async (page) => {
  const details = await getMetaDetails(page);

  const headings = await getHeadings(page);

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
