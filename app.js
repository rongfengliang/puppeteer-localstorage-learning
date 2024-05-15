const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: "ws://localhost:3000/chrome",
  });
  const page = await browser.newPage();
  await page.goto("http://nginx", { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    localStorage.setItem("name", "demoapp");
  });

  let info = await page.evaluate(() => {
    return localStorage.getItem("name");
  });
  console.log(info);
  await page.close();
  await browser.close();
})();
