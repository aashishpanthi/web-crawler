// get the title, keywords and meta description of the page if it exists

const getMetaDetails = async (page) => {
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
  return details;
};

export default getMetaDetails;
