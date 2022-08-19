// Get all of the paragraph tags from the website

const getParagraphDetails = async (page) => {
  return page
    .evaluate(() => {
      const paragraphs = Array.from(document.querySelectorAll("p"));
      return paragraphs.map((paragraph) => {
        return {
          text: paragraph.textContent,
          id: paragraph.id,
          class: paragraph.className,
        };
      });
    })
    .then((paragraphDetails) => {
      return paragraphDetails;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getParagraphDetails;
