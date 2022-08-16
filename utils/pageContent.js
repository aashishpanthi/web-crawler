import puppeteer from "puppeteer";

// scrape the title, meta description, headings and the content of the website
const scrape = async (page, browser) => {
  // get the title, keywords and meta description of the page if it exists
  const details = await page.evaluate(() => {
    const title = document.title;
    const keywords = document.querySelector("meta[name='keywords']")
      ? document.querySelector("meta[name='keywords']").content
      : "";
    const description = document.querySelector("meta[name='description']")
      ? document.querySelector("meta[name='description']").content
      : "";
    return {
      title,
      keywords,
      description,
    };
  });

  // get the headings of the page
  const headings = await page.$$eval("h1, h2, h3, h4", (els) =>
    els.map((el) => el.textContent)
  );

  //check and get either the favicon or shortcut icon of the website

  // get the favicon of the website if it exists
  const favicon = await page.evaluate(() => {
    const favicon = document.querySelector("link[rel='icon']");

    if (favicon) {
      return favicon.href;
    } else {
      // get the shortcut icon of the website if it exists
      const shortcutIcon = document.querySelector("link[rel='shortcut icon']");
      if (shortcutIcon) {
        return shortcutIcon.href;
      }
    }
  });

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
      ogTitle: ogTitle ? ogTitle.content : "",
      ogDescription: ogDescription ? ogDescription.content : "",
      ogUrl: ogUrl ? ogUrl.content : "",
      ogType: ogType ? ogType.content : "",
      ogPhoto: ogPhoto ? ogPhoto.content : "",
    };
  });

  // get the twitter details of the website if exists
  const twitterDetails = await page.evaluate(() => {
    const twitterTitle = document.querySelector("meta[name='twitter:title']");
    const twitterDescription = document.querySelector(
      "meta[name='twitter:description']"
    );
    const twitterPhoto = document.querySelector("meta[name='twitter:image']");
    const twitterCard = document.querySelector("meta[name='twitter:card']");
    const twitterSite = document.querySelector("meta[name='twitter:site']");
    const twitterCreator = document.querySelector(
      "meta[name='twitter:creator']"
    );
    return {
      twitterTitle: twitterTitle ? twitterTitle.content : "",
      twitterDescription: twitterDescription ? twitterDescription.content : "",
      twitterPhoto: twitterPhoto ? twitterPhoto.content : "",
      twitterCard: twitterCard ? twitterCard.content : "",
      twitterSite: twitterSite ? twitterSite.content : "",
      twitterCreator: twitterCreator ? twitterCreator.content : "",
    };
  });

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
