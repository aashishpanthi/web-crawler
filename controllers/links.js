import Links from "../models/links.js";
import isImgUrl from "../utils/isImgUrl.js";

// fetch the new links from the database

export const getLinks = async () => {
  // get all the links from the database updated before last month

  try {
    const links = await Links.find({
      lastUpdated: {
        $lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        // $lt: new Date(new Date().setMonth(new Date().getMonth())),
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
      lastUpdated: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    };
  });

  // remove the duplicates from the links arrays
  const uniqueLinks = newLinks.filter(
    (link, index) => newLinks.findIndex((l) => l.url === link.url) === index
  );

  // check the real links, omit the image/pdf/video links
  const realLinks = uniqueLinks.filter((link) => !isImgUrl(link.url));

  try {
    // save the links to the mongodb database if not already saved
    await Links.insertMany(realLinks);
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

// delete a link from the database by id
export const deleteLink = async (_id) => {
  try {
    await Links.findByIdAndDelete(_id);
    return true;
  } catch (error) {
    return false;
  }
};
