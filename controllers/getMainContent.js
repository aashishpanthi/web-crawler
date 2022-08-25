import getUnion from "../parsers/getUnion.js";
import getIntersection from "../parsers/getIntersection.js";

const getMainContent = ({
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
}) => {
  // compare different arrays of keywords and return the intersection
  const metaIntersection = getIntersection(
    titleKeywords,
    metaDescriptionKeywords
  );

  const twitterIntersection = getIntersection(
    twitterTitleKeywords,
    twitterDescriptionKeywords
  );

  const ogIntersection = getIntersection(
    ogTitleKeywords,
    ogDescriptionKeywords
  );

  const bodyIntersection = getIntersection(mainTagKeywords, headingsKeywords);

  // use the union to get the most common keywords from the page
  const union = getUnion(paragraphKeywords, firstFewKeywords);
  const union2 = getUnion(union, sectionKeywords);
  const union3 = getUnion(union2, strongTextKeywords);

  // compile the keywords into an array to know about the page
  const bodyKeywords = getIntersection(union3, bodyIntersection);

  const union4 = getUnion(siteKeywords, bodyKeywords);
  const union5 = getUnion(union4, metaIntersection);
  const union6 = getUnion(union5, twitterIntersection);
  const union7 = getUnion(union6, ogIntersection);

  console.log(union7);
  return union7;
};

export default getMainContent;
