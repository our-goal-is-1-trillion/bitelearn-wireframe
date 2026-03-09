import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function fixQuizScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1000, height: 1000 });

  const baseUrl = 'http://localhost:5173/bitelearn-wireframe/';
  const screenshotsDir = './screenshots';
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

  const targets = [
    { label: '08_ChoiceQuestion', text: '객관식 퀴즈' },
    { label: '09_OxQuestion', text: 'OX 퀴즈' },
  ];

  for (const item of targets) {
    console.log(`Fixing ${item.label}...`);
    try {
      await page.goto(baseUrl);
      await page.waitForSelector('h1:has-text("BiteLearn IA")');

      const row = page.locator('div.flex.items-center.gap-2.py-2', {
        hasText: item.text,
      });
      const goButton = row.locator('button:has-text("GO")');
      await goButton.scrollIntoViewIfNeeded();
      await goButton.click({ force: true });

      // 퀴즈 데이터와 레이아웃이 완전히 로드될 때까지 충분히 대기
      await page.waitForTimeout(3000);

      // 본문 프레임만 특정하여 캡처 (main 태그가 실제 375x812 화면임)
      const frame = page.locator('main.w-\\[375px\\]').first();

      if (await frame.isVisible()) {
        await frame.screenshot({
          path: path.join(screenshotsDir, `${item.label}.png`),
        });
        console.log(`Successfully replaced ${item.label}.png`);
      } else {
        console.error(`Could not find frame for ${item.label}`);
      }
    } catch (error) {
      console.error(`Failed to fix ${item.label}:`, error.message);
    }
  }

  await browser.close();
}

fixQuizScreenshots().catch(console.error);
