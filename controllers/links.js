import Links from "../models/links.js";

// fetch the new links from the database

export const getLinks = async () => {
  // get all the links from the database updated before last month

  try {
    const links = await Links.find({
      lastUpdated: {
        // $lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        $lt: new Date(new Date().setMonth(new Date().getMonth())),
      },
    });

    return links;
  } catch (error) {
    console.log(error);
  }
};

export const saveLinks = async (links) => {
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

export const updateDate = async (_id) => {
  try {
    await Track.findOneAndUpdate(
      { _id },
      { lastUpdated: new Date() },
      { runValidators: true, returnNewDocument: true }
    );
    return true;
  } catch (error) {
    return false;
  }
};
