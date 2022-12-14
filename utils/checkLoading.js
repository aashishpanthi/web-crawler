// check the complete loading time of the page in milliseconds
const checkLoading = async (page) => {
  //calculate the loading time of a page with puppeteer
  const loadingTime = await page.evaluate(() => {
    const timing = window.performance.timing;

    return timing.loadEventEnd - timing.navigationStart;
  });

  console.log(loadingTime);

  return loadingTime;
};

export default checkLoading;
