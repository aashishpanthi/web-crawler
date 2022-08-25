import getRepeatingKeywords from "../parsers/mainTag.js";
import splitWords from "../parsers/splitWords.js";

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

  const titleKeywords = title ? splitWords(title) : [];

  const metaDescriptionKeywords = metaDescription
    ? splitWords(metaDescription)
    : [];

  const twitterTitleKeywords = twitterTitle ? splitWords(twitterTitle) : [];

  const twitterDescriptionKeywords = twitterDescription
    ? splitWords(twitterDescription)
    : [];

  const ogTitleKeywords = ogTitle ? splitWords(ogTitle) : [];

  const ogDescriptionKeywords = ogDescription ? splitWords(ogDescription) : [];

  const headingsKeywords = headings
    .map((heading) => (heading ? splitWords(heading) : []))
    .flat(1);

  const siteKeywords = keywords.split(",");

  const mainTagKeywords = mainContent ? getRepeatingKeywords(mainContent) : [];

  const firstFewKeywords = firstFewLines
    ? getRepeatingKeywords(firstFewLines)
    : [];

  let allParagraphsText = "";

  paragraphDetails.map((paragraph) => (allParagraphsText = paragraph + " "));

  const paragraphKeywords = allParagraphsText
    ? getRepeatingKeywords(allParagraphsText)
    : [];

  const strongTextKeywords = strongText
    .map((strong) => (strong ? splitWords(strong) : ""))
    .flat(1);

  const sectionIdKeywords = sectionDetails.map((section) =>
    section ? splitWords(section.id) : ""
  );

  const sectionClassKeywords = sectionDetails.map((section) =>
    section ? splitWords(section.class) : ""
  );

  const sectionKeywords = [...sectionIdKeywords, ...sectionClassKeywords]
    .filter((value) => value)
    .flat(1);

  return {
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
    strongTextKeywords,
    sectionKeywords,
  };
};

export default parser;
