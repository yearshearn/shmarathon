const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.baidu.com/');
  await page.locator('#kw').click();
  await page.locator('#kw').fill('海智在线');
  await page.locator('#kw').press('Enter');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '海智在线 全球非标零部件采购及关键模组交付平台' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('navigation').getByRole('link', { name: '我是工厂' }).click();
  await page1.getByRole('navigation').getByRole('link', { name: '关于我们' }).click();
  const page2Promise = page1.waitForEvent('popup');
  await page1.getByRole('navigation').getByRole('link', { name: '登录' }).click();
  const page2 = await page2Promise;
  await page2.getByRole('link', { name: '短信快捷登录' }).click();
  await page2.close();
  await page1.close();

  // ---------------------
  await context.close();
  await browser.close();
})();