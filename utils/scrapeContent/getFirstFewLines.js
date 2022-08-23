// Get the first few lines after the heading tags

const getFirstFewLines = async (page) => {
  // get the first few lines of a body tag
  const body = await page.$("body");
  const bodyText = await body.evaluate((body) =>
    body.innerText.split("\n").slice(10, 60).join("\n")
  );
  return bodyText;
};

export default getFirstFewLines;
