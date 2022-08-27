import { saveLinks } from "./links.js";

const saveData = async (data, mainData) => {
  const { loadingTime, images, innerLinks, urlKeywords } = data;

  try {
    // Save the links to the mongodb database
    await saveLinks(innerLinks);

    // save the images to redis json database
  } catch (error) {
    console.log(error);
  }
};

export default saveData;
