// Get all images from a webpage with alt text
async function getImages(page, browser) {
  const images = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll("img"));
    return images.map((image) => {
      return {
        src: image.src,
        alt: image.alt,
      };
    });
  });
  return images;
}

export default getImages;
