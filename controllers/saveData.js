import { saveLinks } from "./links.js";
import { saveImage } from "../models/image.js";

const saveData = async (data, mainData, url) => {
  const { loadingTime, images, innerLinks, urlKeywords, details } = data;

  try {
    // Save the links to the mongodb database
    await saveLinks(innerLinks);

    // save the images to the redis database
    for (let i = 0; i < images.length; i++) {
      await saveImage(images[i]);
    }

    // save all data abput the website in redis database
    const websiteData = {
      loadingTime,
      url,
      headings: data.headings,
      urlKeywords,
      title: details.title,
      description: details.description,
      firstFewWords: details.firstFewLines,
      mainKeywords: mainData,
    };

    await saveWebsiteData(websiteData);
  } catch (error) {
    console.log(error);
  }
};

export default saveData;
