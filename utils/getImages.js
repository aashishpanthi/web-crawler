// Get all images from a webpage with alt text
async function getImages(page) {
  const images = await page.evaluate(() => {
    // Get all images from the page with img tag
    const images = Array.from(document.querySelectorAll("img"));

    console.log("images");

    return images.map((image) => {
      return {
        src: image.src,
        alt: image.alt,
      };
    });
  });

  // Get all images with from the page set as background image
  const backgroundImages = await page.evaluate(() => {
    const backgroundImages = Array.from(document.querySelectorAll("*"));

    return backgroundImages
      .map((backgroundImage) => {
        return {
          src: backgroundImage.style.backgroundImage
            .replace(/^url\(['"]?/, "")
            .replace(/['"]?\)$/, ""),
          alt: backgroundImage.alt,
        };
      })
      .filter((backgroundImage) => {
        return backgroundImage.src !== "";
      });
  });

  return [...images, ...backgroundImages];
}

export default getImages;
