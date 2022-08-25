// a function that returns the most repeating words in an array of words

const getMostRepeatingWords = (words) => {
  // create an object to store the words and their repeating times
  const wordCount = {};
  // loop through the words array
  for (let i = 0; i < words.length; i++) {
    // if the word is not in the wordCount object, add it with a repeating time of 1
    if (!wordCount[words[i]]) {
      wordCount[words[i]] = 1;
    } else {
      // if the word is in the wordCount object, increment the repeating time by 1
      wordCount[words[i]]++;
    }
  }
  // create an array to store the words and their repeating times
  const wordCountArray = [];
  // loop through the wordCount object
  for (let word in wordCount) {
    // push the word and its repeating time into the wordCountArray array
    wordCountArray.push([word, wordCount[word]]);
  }
  // sort the wordCountArray array by the repeating time in descending order
  wordCountArray.sort((a, b) => b[1] - a[1]);

  // create an array of only the words from the wordCountArray array
  const repeatingWords = wordCountArray.map((word) => word[0]);

  // return the most repeating words in the wordCountArray array
  return repeatingWords.slice(0, 50);
};

export default getMostRepeatingWords;
