import puppeteer from "puppeteer";

// scrape the title, meta description, headings and the content of the website
const scrape = async (page, browser) => {
  // get the title of the page
  const title = await page.title();

  // get the meta description of the page
  const metaDescription = await page.$eval(
    "meta[name=description]",
    (el) => el.content
  );

  // get the keywords of the page
  const keywords = await page.$eval("meta[name=keywords]", (el) => el.content);

  // get the headings of the page
  const headings = await page.$$eval("h1, h2, h3, h4", (els) =>
    els.map((el) => el.textContent)
  );

  //check and get either the favicon or shortcut icon of the website
  const favicon = await page.$eval("link[rel=icon]", (el) => el.href);
  const shortcutIcon = await page.$eval(
    "link[rel=shortcut icon]",
    (el) => el.href
  );
  const faviconOrShortcutIcon = favicon || shortcutIcon;

  //get the og details of the website
  const ogDetails = await page.evaluate(() => {
    const ogPhoto = document.querySelector("meta[property*='og:image']");
    const ogTitle = document.querySelector("meta[property*='og:title']");
    const ogUrl = document.querySelector("meta[property*='og:url']");
    const ogType = document.querySelector("meta[property*='og:type']");
    const ogDescription = document.querySelector(
      "meta[property*='og:description']"
    );
    return {
      ogTitle,
      ogDescription,
      ogUrl,
      ogType,
      ogPhoto,
    };
  });

  return {
    title,
    metaDescription,
    headings,
    ogDetails,
    favicon: faviconOrShortcutIcon,
    keywords,
  };
};

export default scrape;
