// Get the ordered lists and unordered lists

const getLists = async (page) => {
  return page
    .evaluate(() => {
      const orderedLists = Array.from(document.querySelectorAll("ol li"));
      const unorderedLists = Array.from(document.querySelectorAll("ul li"));

      return {
        orderedLists: orderedLists.textContent,
        unorderedLists: unorderedLists.textContent,
      };
    })
    .then((lists) => {
      return lists;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getLists;
