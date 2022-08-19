//get all the links in the page with the href attribute and the text content of the link
const getLinks = async (page) => {
  const links = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("a"));
    return links.map((link) => {
      return {
        href: link.href,
        text: link.textContent,
      };
    });
  });

  return links;
};

export default getLinks;
