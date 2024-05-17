const puppeteer = require("puppeteer-core");
const  crypto =require('crypto');

(async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: "ws://localhost:3000/",
  });
  const page = await browser.newPage();
  await page.exposeFunction('md5', text =>
    crypto.createHash('md5').update(text).digest('hex')
  );
  page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36")
  await page.goto("http://nginx", { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    localStorage.setItem("name", "demoapp");
  });

  let info = await page.evaluate(async () => {
    let name = localStorage.getItem("name");
    let mymd5 = await window.md5(name);
    return  {name, mymd5}
  });
  console.log(info);
  await page.close();
  await browser.close();
})();
