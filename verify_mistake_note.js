import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function verifyMistakeNote() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  const baseUrl = 'http://localhost:5173/bitelearn-wireframe/';
  await page.goto(baseUrl);
  await page.waitForSelector('h1:has-text("BiteLearn IA")', { timeout: 15000 });

  const screenshotsDir = './screenshots_verify';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  console.log('Navigating to MistakeNote...');
  const row = page.locator('div.flex.items-center.gap-2.py-2', {
    hasText: '나의 학습 노트 통합',
  });
  const goButton = row.locator('button:has-text("GO")');

  await goButton.scrollIntoViewIfNeeded();
  await goButton.click({ force: true });
  await page.waitForTimeout(1000);

  // Take screenshot of the full frame
  let frame = page.locator('main.w-\\[375px\\]').first();
  if (!(await frame.isVisible())) {
    frame = page.locator('div.w-\\[375px\\]').last();
  }

  if (await frame.isVisible()) {
    await frame.screenshot({
      path: path.join(screenshotsDir, `13_MistakeNote_verify.png`),
    });
    console.log('Saved 13_MistakeNote_verify.png');
  } else {
    console.log('Frame not found, taking full page');
    await page.screenshot({
      path: path.join(screenshotsDir, `13_MistakeNote_verify_full.png`),
    });
  }

  await browser.close();
}

verifyMistakeNote().catch(console.error);
