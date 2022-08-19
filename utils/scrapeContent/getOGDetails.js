const getOGDetails = async (page) => {
  //get the og details of the website
  const ogDetails = await page.evaluate(() => {
    const ogPhoto = document.querySelector("meta[property*='og:image']");
    const ogTitle = document.querySelector("meta[property*='og:title']");
    const ogUrl = document.querySelector("meta[property*='og:url']");
    const ogType = document.querySelector("meta[property*='og:type']");
    const ogDescription = document.querySelector(
      "meta[property*='og:description']"
    );
    return {
      ogTitle: ogTitle ? ogTitle.content : "",
      ogDescription: ogDescription ? ogDescription.content : "",
      ogUrl: ogUrl ? ogUrl.content : "",
      ogType: ogType ? ogType.content : "",
      ogPhoto: ogPhoto ? ogPhoto.content : "",
    };
  });

  return ogDetails;
};

export default getOGDetails;
