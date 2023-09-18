const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://passport.weibo.com/visitor/visitor?entry=miniblog&a=enter&url=https%3A%2F%2Fweibo.com%2Fnewlogin%3Ftabtype%3Dweibo%26gid%3D102803%26openLoginLayer%3D0%26url%3D&domain=weibo.com&ua=Mozilla%2F5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F114.0.0.0%20Safari%2F537.36&_rand=1685887909897&sudaref=');
  await page.goto('https://weibo.com/newlogin?tabtype=weibo&gid=102803&openLoginLayer=0&url=');
  const title = await page.title();
    console.log('2222222222',title);

  // ---------------------
  await context.close();
  await browser.close();
})();