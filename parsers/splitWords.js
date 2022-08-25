const splitWords = (str) => {
  const words = str
    .replace(/[\n\t]/g, " ")
    .split(" ")
    .map((word) => word.toLowerCase())
    .filter((word) => word !== "");

  return words;
};

export default splitWords;
