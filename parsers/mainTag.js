import getMostRepeatingWords from "./getMostRepeatingWords.js";
import splitWords from "./splitWords.js";

// get the main and repeating keywords from the html string
const getMainTagContent = (html) => {
  // remove all of the html tags from the html string
  const htmlWithoutTags = html.replace(/<[^>]*>/g, "");

  // split the html string into an array of words
  const words = splitWords(htmlWithoutTags);

  // get the most repeating words from the array of words with repeating times
  const mainTagContent = getMostRepeatingWords(words);

  return mainTagContent;
};

export default getMainTagContent;
