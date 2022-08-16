//get all the links in the page with the href attribute and the text content of the link
const getLinks = async (page, browser) => {
  const links = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("a"));
    return links.map((link) => {
      return {
        href: link.href,
        text: link.textContent,
      };
    });
  });
  await browser.close();
  return links;
};

export default getLinks;
