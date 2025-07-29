import { test, expect } from '@playwright/test';

test('首頁應該有 Angular 標題', async ({ page }) => {
  // 假設你 ng serve 後本地網站跑在 http://localhost:4200
  await page.goto('http://localhost:4200');

  // 檢查標題是否包含 'Angular'
  await expect(page).toHaveTitle(/Frontend/i);

  // 可以檢查畫面某個元素內容
  //await expect(page.locator('h1')).toContainText('Welcome');
});
