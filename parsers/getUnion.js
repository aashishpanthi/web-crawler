// compare two arrays of keywords and return the most common keywords with remaining keywords

const getUnion = (array1, array2) => {
  const intersection = array1.filter((value) => array2.includes(value));
  const remaining = array1.filter((value) => !array2.includes(value));
  return intersection.length > 10
    ? intersection
    : [...intersection, ...remaining];
};

export default getUnion;
