import getRepeatingKeywords from "../parsers/mainTag.js";

const parser = (data) => {
  const { details, urlKeywords } = data;

  const {
    title,
    metaDescription,
    keywords,
    ogDetails,
    headings,
    twitterDetails,
    mainContent,
    firstFewLines,
    sectionDetails,
    paragraphDetails,
    tableDetails,
    strongText,
  } = details;

  const { twitterTitle, twitterDescription } = twitterDetails;
  const { ogTitle, ogDescription } = ogDetails;

  const titleKeywords = title.split(" ");
  const metaDescriptionKeywords = metaDescription.split(" ");
  const twitterTitleKeywords = twitterTitle.split(" ");
  const twitterDescriptionKeywords = twitterDescription.split(" ");
  const ogTitleKeywords = ogTitle.split(" ");
  const ogDescriptionKeywords = ogDescription.split(" ");
  const headingsKeywords = headings.map((heading) => heading.split(" "));
  const siteKeywords = keywords.split(",");

  const htmlWithoutTags = mainContent.replace(/<[^>]*>/g, "");
  const words = htmlWithoutTags?.split(" ");

  console.log(words);
  //   const mainTagKeywords = getRepeatingKeywords(mainContent);
  //   if (!mainContent) {
  //     console.log("mainContent" + mainContent);
  //   }

  if (!firstFewLines) {
    const firstFewKeywords = firstFewLines.split(" ");
  }

  const paragraphKeywords = paragraphDetails.map((paragraph) => {
    if (!paragraph.text) {
      return getRepeatingKeywords(paragraphDetails.text);
    } else {
      return;
    }
  });

  const strongTextKwywords = strongText.map((strong) => {
    if (!strong.text) {
      return strong.text.split(" ");
    } else {
      return;
    }
  });

  const sectionKeywords = sectionDetails.map((section) => {
    if (!section.id) {
      return [section.id, section.class ? section.class.split(" ") : ""];
    } else {
      return;
    }
  });

  console.log({
    titleKeywords,
    metaDescriptionKeywords,
    twitterTitleKeywords,
    twitterDescriptionKeywords,
    ogTitleKeywords,
    ogDescriptionKeywords,
    headingsKeywords,
    siteKeywords,
    mainTagKeywords,
    firstFewKeywords,
    paragraphKeywords,
    strongTextKwywords,
    sectionKeywords,
  });
};

export default parser;
