const getTwitterDetails = async (page) => {
  // get the twitter details of the website if exists
  const twitterDetails = await page.evaluate(() => {
    const twitterTitle = document.querySelector("meta[name='twitter:title']");
    const twitterDescription = document.querySelector(
      "meta[name='twitter:description']"
    );
    const twitterPhoto = document.querySelector("meta[name='twitter:image']");
    const twitterCard = document.querySelector("meta[name='twitter:card']");
    const twitterSite = document.querySelector("meta[name='twitter:site']");
    const twitterCreator = document.querySelector(
      "meta[name='twitter:creator']"
    );
    return {
      twitterTitle: twitterTitle ? twitterTitle.content : "",
      twitterDescription: twitterDescription ? twitterDescription.content : "",
      twitterPhoto: twitterPhoto ? twitterPhoto.content : "",
      twitterCard: twitterCard ? twitterCard.content : "",
      twitterSite: twitterSite ? twitterSite.content : "",
      twitterCreator: twitterCreator ? twitterCreator.content : "",
    };
  });
  return twitterDetails;
};

export default getTwitterDetails;
