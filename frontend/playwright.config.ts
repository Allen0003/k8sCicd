import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',      // 只跑 e2e 下面的測試
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
});