import Links from "../models/links.js";

const saveLinks = async (links) => {
  const newLinks = links.map((link) => {
    const url = new URL(link["href"]);
    const baseUrl = `${url.protocol}//${url.hostname}${url.pathname}`;
    return {
      url: baseUrl,
    };
  });

  // renove the duplicates from the links arrays
  const uniqueLinks = newLinks.filter(
    (link, index) => newLinks.findIndex((l) => l.url === link.url) === index
  );

  try {
    // save the links to the mongodb database if not already saved
    await Links.insertMany(uniqueLinks);
  } catch (error) {
    console.log(error);
  }
};

export default saveLinks;
