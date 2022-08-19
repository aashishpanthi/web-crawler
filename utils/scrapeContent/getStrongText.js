// Get the strong tag content of the website

const getStrongText = async (page) => {
  return page
    .evaluate(() => {
      const strongTags = Array.from(document.querySelectorAll("strong"));
      return strongTags
        .map((strongTag) => {
          return {
            text: strongTag.textContent,
            id: strongTag.id,
            class: strongTag.className,
          };
        })
        .filter((strongTag) => strongTag.text !== "");
    })
    .then((strongText) => {
      return strongText;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getStrongText;
