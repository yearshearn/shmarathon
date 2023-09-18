const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://passport.shang-ma.com/#/login?redirect_url=https%3A%2F%2Fwww.shmarathon.com%2F#/user/info');
  await page.getByPlaceholder('邮箱/手机号').click();
  await page.getByPlaceholder('邮箱/手机号').fill('13251953746');
  await page.getByPlaceholder('密码').click();
  await page.getByPlaceholder('密码').fill('ZYH11zyh');
  console.log('点击登录======================')
  await page.getByRole('button', { name: '登录' }).click();
  await page.getByRole('menuitem', { name: '我的积分' }).click();
  console.log('准备点击签到按扭======================')

  try{
    await page.getByRole('button', { name: '去签到' }).click();
  }catch(e){
    console.log('已签到========');
  }
  setTimeout(async () => {
    console.log('准备关闭浏览器======================');
    await context.close();
    await browser.close();
  }, 10000); // 等待 10 秒后关闭浏览器
  console.log('签到成功======================');

})();
