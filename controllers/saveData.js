import { saveLinks } from "./links.js";
import { saveImage, getImages } from "../models/image.js";
import { saveWebsiteData, getWebsiteData } from "../models/website.js";

const saveData = async (data, mainData, url) => {
  const { loadingTime, images, innerLinks, urlKeywords, details } = data;
  const { headings, firstFewLines, title, metaDescription } = details;

  try {
    // save the images to the redis database
    for (let i = 0; i < images.length; i++) {
      const imageData = await getImages(images[i].src);

      if (imageData.length > 0) {
        console.log("image already exists");
        continue;
      }

      console.log("image does not exist");
      const image = {
        imageUrl: images[i].src,
        altTag: images[i].alt,
        siteTitle: details.title,
        siteURL: url,
      };
      await saveImage(image);
    }

    // check if the url is already in the database
    const website = await getWebsiteData(url);

    if (website.length === 0) {
      console.log("url does not exist");
      // save all data abput the website in redis database
      const websiteData = {
        loadTime: loadingTime,
        url: url,
        headings: headings
          .map((item) => item.replace(/[\n\t]/g, " "))
          .filter((item) => item !== ""),
        urlKeywords: urlKeywords,
        title: title,
        description: metaDescription,
        firstFewWords: firstFewLines
          .replace(/<[^>]*>/g, "")
          .replace(/[\n\t]/g, ""),
        mainKeywords: mainData,
        lastUpdated: new Date(),
        backLinks: 1,
      };
      await saveWebsiteData(websiteData);
    } else {
      console.log("url already exists");
      // update the website data in the database

      website.loadTime = loadingTime;
      website.headings = headings
        .map((item) => item.replace(/[\n\t]/g, " "))
        .filter((item) => item !== "");
      website.urlKeywords = urlKeywords;
      website.title = title;
      website.description = metaDescription;
      website.firstFewWords = firstFewLines
        .replace(/<[^>]*>/g, "")
        .replace(/[\n\t]/g, "");
      website.mainKeywords = mainData;
      website.url = url;
      website.backLinks = website.backLinks;
      website.backLinksKeywords = website.backLinksKeywords;
      website.lastUpdated = new Date();

      await saveWebsiteData(website);
    }

    // map the inner links and find if the url is already in the database
    for (let i = 0; i < innerLinks.length; i++) {
      const link = innerLinks[i].href;
      const website = await getWebsiteData(link);

      if (website.length > 0) {
        // update the website data in the database
        website.backLinks += 1;
        const backLinksKeywords = website.backLinksKeywords
          ? website.backLinksKeywords
          : [];

        website.backLinksKeywords = backLinksKeywords.concat(
          [innerLinks[i].text, innerLinks[i].title]
            .map((item) => item.toLowerCase())
            .map((item) => item.replace(/[\n\t]/g, " "))
            .filter((item) => item !== "")
        );

        website.loadTime = website.loadTime;
        website.headings = website.headings;
        website.urlKeywords = website.urlKeywords;
        website.title = website.title;
        website.description = website.description;
        website.firstFewWords = website.firstFewWords;
        website.mainKeywords = website.mainKeywords;
        website.url = website.url;
        website.lastUpdated = website.lastUpdated;

        await saveWebsiteData(website);

        //remove the link from the array of links to be saved
        innerLinks.splice(i, 1);
      }
    }

    // Save the links to the mongodb database
    await saveLinks(innerLinks);
  } catch (error) {
    console.log(error);
  }
};

export default saveData;
