import { saveLinks } from "./links.js";
import { saveImage, getImages } from "../models/image.js";
import {
  saveWebsiteData,
  getWebsiteData,
  getRepository,
} from "../models/website.js";

const saveData = async (data, mainData, url) => {
  const { loadingTime, images, innerLinks, urlKeywords, details } = data;
  const { headings, firstFewLines, title, metaDescription } = details;

  const repository = await getRepository();

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
    const sites = await getWebsiteData(url);

    if (sites.length === 0) {
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

      const websiteData = await repository.fetch(sites[0].entityId);

      websiteData.url = url;
      websiteData.urlKeywords = urlKeywords;
      websiteData.loadTime = loadingTime;
      websiteData.headings = headings
        .map((item) => item.replace(/[\n\t]/g, " "))
        .filter((item) => item !== "");
      websiteData.title = title;
      websiteData.description = metaDescription;
      websiteData.firstFewWords = firstFewLines
        .replace(/<[^>]*>/g, "")
        .replace(/[\n\t]/g, "");
      websiteData.mainKeywords = mainData;
      websiteData.backLinks = websiteData.backLinks;
      websiteData.backLinksKeywords = websiteData.backLinksKeywords;
      websiteData.lastUpdated = new Date();

      await repository.save(websiteData);
    }

    console.log("Meow");
    // map the inner links and find if the url is already in the database
    for (let i = 0; i < innerLinks.length; i++) {
      const link = innerLinks[i].href;
      console.log("link", link);
      const sites = await getWebsiteData(link);

      if (sites.length > 0) {
        const websiteData = await repository.fetch(sites[0].entityId);

        // use the same values
        websiteData.loadTime = websiteData.loadTime;
        websiteData.headings = websiteData.headings;
        websiteData.title = websiteData.title;
        websiteData.description = websiteData.description;
        websiteData.firstFewWords = websiteData.firstFewWords;
        websiteData.mainKeywords = websiteData.mainKeywords;
        websiteData.lastUpdated = websiteData.lastUpdated;
        websiteData.url = websiteData.url;
        websiteData.urlKeywords = websiteData.urlKeywords;

        // update the website data in the database
        websiteData.backLinks = websiteData.backLinks + 1;

        const backLinksKeywords = websiteData.backLinksKeywords
          ? websiteData.backLinksKeywords
          : [];

        websiteData.backLinksKeywords = backLinksKeywords.push(
          innerLinks[i].text
        );

        await repository.save(websiteData);

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
