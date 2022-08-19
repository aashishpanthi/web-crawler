//check and get either the favicon or shortcut icon of the website

const getFavicon = async (page) => {
  const favicon = await page.evaluate(() => {
    // get the favicon of the website if it exists
    const favicon = document.querySelector("link[rel='icon']");

    if (favicon) {
      return favicon.href;
    } else {
      // get the shortcut icon of the website if it exists
      const shortcutIcon = document.querySelector("link[rel='shortcut icon']");
      if (shortcutIcon) {
        return shortcutIcon.href;
      }
    }
  });

  return favicon;
};

export default getFavicon;
