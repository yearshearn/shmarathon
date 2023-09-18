const { chromium } = require('playwright');
async function scrollDown(page, scrollCount) {
    for (let i = 0; i < scrollCount; i++) {
      // 模拟滚动到页面底部
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
  
      // 等待一段时间，以便加载更多文章
      await page.waitForTimeout(2000);
    }
  }
async function scrapeJuejinArticles() {
  const browser = await chromium.launch({
    headless: true,
  });
  const page = await browser.newPage();

  // 导航到掘金首页
  await page.goto('https://juejin.cn/', { waitUntil: 'domcontentloaded' });

  // 等待文章加载完成
  await page.waitForSelector('.entry-list');
  //模拟滚动加载
  await scrollDown(page, 3);
  // 获取文章列表
  const articles = await page.$$eval('.entry-list .item', (entries) =>
    entries.map((entry) => {        
        return {
            title: entry.querySelector('.title-row .title')?.innerText||'-',
            url: entry.querySelector('.title-row .title')?.href,
            excerpt: entry.querySelector('.abstract a div')?.innerText||'-',
          }
    })
  );

  console.log('掘金首页文章：');
  const list =articles.filter((article) => article.title !== '-')
  console.log(list);
  console.log('首页文章共:',list.length);


  await browser.close();
}

scrapeJuejinArticles();
