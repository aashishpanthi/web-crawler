// compare different arrays of keywords and return the intersection
const intersection = (arr1, arr2) => {
  return arr1.filter((value) => arr2.includes(value));
};

export default intersection;
