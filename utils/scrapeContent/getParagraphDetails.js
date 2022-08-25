// Get all of the paragraph tags from the website

const getParagraphDetails = async (page) => {
  return page
    .evaluate(() => {
      const paragraphs = Array.from(document.querySelectorAll("p"));
      return paragraphs.map((paragraph) => paragraph.textContent);
    })
    .then((paragraphDetails) => {
      return paragraphDetails;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getParagraphDetails;
