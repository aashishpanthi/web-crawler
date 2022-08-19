// Get the headings of the table

const getHeadingsDetails = async (page) => {
  // headings of the table

  const headings = await page.$$eval("thead > tr > th", (els) =>
    els.map((el) => el.textContent).filter((el) => el !== "")
  );
  return headings;
};

export default getHeadingsDetails;
