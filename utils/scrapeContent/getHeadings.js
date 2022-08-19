const getHeadings = async (page) => {
  // get the headings of the page
  const headings = await page.$$eval("h1, h2, h3, h4, h5, h6", (els) =>
    els.map((el) => el.textContent)
  );

  return headings;
};

export default getHeadings;
