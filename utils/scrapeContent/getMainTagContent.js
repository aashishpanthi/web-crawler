// Get the content inside of the main tag

const getMainTagContent = (page) => {
  return page
    .evaluate(() => {
      const mainTag = document.querySelector("main");
      return mainTag ? mainTag.innerHTML : "";
    })
    .then((mainTagContent) => {
      return mainTagContent;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getMainTagContent;
