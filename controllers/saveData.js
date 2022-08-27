import { saveLinks } from "./links.js";
import { saveImage, getImages } from "../models/image.js";
import { saveWebsiteData, getWebsiteData } from "../models/website.js";

const saveData = async (data, mainData, url) => {
  const { loadingTime, images, innerLinks, urlKeywords, details } = data;

  try {
    // save the images to the redis database
    for (let i = 0; i < images.length; i++) {
      const imageData = getImages(images[i]);

      if (imageData) {
        continue;
      }

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

    if (!website) {
      // save all data abput the website in redis database
      const websiteData = {
        loadingTime,
        url,
        headings: data.headings,
        urlKeywords,
        title: details.title,
        description: details.description,
        firstFewWords: details.firstFewLines.replace(/<[^>]*>/g, ""),
        mainKeywords: mainData,
      };
      await saveWebsiteData(websiteData);
    } else {
      // update the website data in the database
      website.loadingTime = loadingTime;
      website.headings = data.headings;
      website.urlKeywords = urlKeywords;
      website.title = details.title;
      website.description = details.description;
      website.firstFewWords = details.firstFewLines.replace(/<[^>]*>/g, "");
      website.mainKeywords = mainData;

      website.lastUpdated = new Date();

      await saveWebsiteData(website);
    }

    // map the inner links and find if the url is already in the database
    for (let i = 0; i < innerLinks.length; i++) {
      const link = innerLinks[i].href;
      const website = await getWebsiteData(link);

      if (website) {
        // update the website data in the database
        website.backLinks += 1;
        website.backLinksKeywords = website.backLinksKeywords.concat([
          innerLinks[i].text,
          innerLinks[i].title,
        ]);

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
