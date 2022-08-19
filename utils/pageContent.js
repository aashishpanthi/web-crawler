import getFavicon from "./scrapeContent/getFavicon.js";
import getHeadings from "./scrapeContent/getHeadings.js";
import getMetaDetails from "./scrapeContent/getMetaDetails.js";
import getOGDetails from "./scrapeContent/getOGDetails.js";
import getTwitterDetails from "./scrapeContent/getTwitterDetails.js";
import getFirstFewLines from "./scrapeContent/getFirstFewLines.js";
import getMainTagContent from "./scrapeContent/getMainTagContent.js";
import getSectionDetails from "./scrapeContent/getSectionDetails.js";
import getParagraphDetails from "./scrapeContent/getParagraphDetails.js";

// scrape the title, meta description, headings and the content of the website
const scrape = async (page) => {
  const details = await getMetaDetails(page);

  const headings = await getHeadings(page);

  const favicon = await getFavicon(page);

  const ogDetails = await getOGDetails(page);

  const twitterDetails = await getTwitterDetails(page);

  const firstFewLines = await getFirstFewLines(page);

  console.log(firstFewLines);

  const mainContent = await getMainTagContent(page);

  console.log(mainContent);

  const sectionDetails = await getSectionDetails(page);

  const paragraphDetails = await getParagraphDetails(page);

  console.log(sectionDetails);
  console.log(paragraphDetails);

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
