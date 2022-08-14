import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: ["--no-sandbox", "--headless"],
  });
  const page = await browser.newPage();
  await page.goto("https://example.com");
  await page.screenshot({ path: "test.png" });

  await browser.close();
})();
