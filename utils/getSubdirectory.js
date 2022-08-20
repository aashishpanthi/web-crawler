// get the words in the url subdirectory

const getSubdirectory = (url) => {
  const urlSplit = url.split("://")[1];

  console.log(url.split("://")[1]);

  const urlKeywords = urlSplit.split(/[.\-/_]/);
  return urlKeywords;
};

export default getSubdirectory;
