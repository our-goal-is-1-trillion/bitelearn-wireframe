import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function capturePureScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport large enough
  await page.setViewportSize({ width: 1000, height: 1000 });

  const baseUrl = 'http://localhost:5173/bitelearn-wireframe/';

  const screenshotsDir = './screenshots';
  if (fs.existsSync(screenshotsDir)) {
    fs.rmSync(screenshotsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(screenshotsDir);

  const pages = [
    { label: '01_IA_Home', text: 'HOME' },
    { label: '02_Login', text: '로그인' },
    { label: '03_Signup', text: '회원가입' },
    { label: '04_Dashboard', text: '홈 대시보드' },
    { label: '05_LearningHome', text: '학습 도메인 목록' },
    { label: '06_ChapterList', text: '챕터 목록' },
    { label: '07_WordLearning', text: '단어 학습' },
    { label: '08_ChoiceQuestion', text: '객관식 퀴즈' },
    { label: '09_OxQuestion', text: 'OX 퀴즈' },
    { label: '10_ConversationQuestion', text: '대화형 퀴즈' },
    { label: '11_DocumentChoiceQuestion', text: '문서 객관식' },
    { label: '12_DocumentClickQuestion', text: '문서 오답 찾기' },
    { label: '13_MistakeNote', text: '나의 학습 노트 통합' },
    { label: '14_ArticleList', text: '아티클 목록' },
    { label: '15_ArticleDetail', text: '아티클 상세' },
    { label: '16_Mypage', text: '마이페이지 홈' },
  ];

  for (const item of pages) {
    console.log(`Processing ${item.label}...`);

    try {
      await page.goto(baseUrl);
      await page.waitForSelector('h1:has-text("BiteLearn IA")', {
        timeout: 15000,
      });

      if (item.label !== '01_IA_Home') {
        const row = page.locator('div.flex.items-center.gap-2.py-2', {
          hasText: item.text,
        });
        const goButton = row.locator('button:has-text("GO")');

        await goButton.scrollIntoViewIfNeeded();
        await goButton.click({ force: true });

        // Wait for transition and lazy loading
        // Increase wait time for quiz pages
        const isQuiz =
          item.label.toLowerCase().includes('question') ||
          item.label.includes('Learning');
        await page.waitForTimeout(isQuiz ? 3000 : 1500);
      }

      // Hide "IA 홈으로" and "UX 테스트 UI" elements
      await page.evaluate(() => {
        const elementsToHide = [
          ...Array.from(document.querySelectorAll('button')).filter((b) =>
            b.textContent?.includes('IA 홈으로')
          ),
          ...Array.from(document.querySelectorAll('div')).filter((d) =>
            d.textContent?.includes('UX 테스트 UI')
          ),
        ];
        elementsToHide.forEach((el) => {
          if (el instanceof HTMLElement) el.style.display = 'none';
        });
      });

      // Find the mobile frame by specific dimensions (375x812)
      // Prioritize 'main.w-[375px]' as verified by subagent
      const frameHandle = await page.evaluateHandle(() => {
        const candidates = Array.from(
          document.querySelectorAll('main.w-\\[375px\\], main, div')
        );
        return candidates.find((el) => {
          const rect = el.getBoundingClientRect();
          // Precise 375x812 (+- 1px)
          return (
            Math.abs(rect.width - 375) < 1.1 &&
            Math.abs(rect.height - 812) < 1.1
          );
        });
      });

      const frame = frameHandle.asElement();
      if (frame) {
        await frame.screenshot({
          path: path.join(screenshotsDir, `${item.label}.png`),
        });
        console.log(`Saved pure ${item.label}.png`);
      } else {
        console.warn(
          `Could not find 375x812 frame for ${item.label}, taking viewport fallback.`
        );
        await page.screenshot({
          path: path.join(screenshotsDir, `${item.label}.png`),
        });
      }
    } catch (error) {
      console.error(`Failed to capture ${item.label}:`, error.message);
    }
  }

  await browser.close();
  console.log('Capture process finished.');
}

capturePureScreenshots().catch(console.error);
