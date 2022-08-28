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
    try {
      const url = new URL(link.href);
      const baseUrl = `${url.protocol}//${url.hostname}${url.pathname}`;
      return {
        url: baseUrl,
        lastUpdated: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      };
    } catch (error) {
      return;
    }
  });

  console.log(newLinks);

  const filteredLinks = newLinks
    .filter((link) => link !== undefined)
    .filter((link) => link != "javascript://void(0)");

  // check the real links, omit the image/pdf/video links
  const realLinks = filteredLinks.filter((link) => !isImgUrl(link.url));

  console.log(realLinks);

  // save the links to the mongodb database if not already saved
  for (let i = 0; i < realLinks.length; i++) {
    try {
      const newLink = new Links(realLinks[i]);
      await newLink.save();
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateDate = async (_id) => {
  try {
    await Links.findOneAndUpdate(
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
