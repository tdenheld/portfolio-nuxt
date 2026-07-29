import { expect, test } from '@playwright/test';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const THEME_TRANSITION_DURATION = 1600;
const PAGES_DIRECTORY = join(process.cwd(), 'app/pages');
const PROJECTS_DIRECTORY = join(process.cwd(), 'content/projects');

const getPageRoutes = (directory = PAGES_DIRECTORY, segments: string[] = []) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      return getPageRoutes(join(directory, entry.name), [...segments, entry.name]);
    }

    if (!entry.isFile() || !entry.name.endsWith('.vue') || entry.name.includes('[')) {
      return [];
    }

    const pageName = entry.name.replace(/\.vue$/, '');
    const routeSegments = pageName === 'index' ? segments : [...segments, pageName];
    return [`/${routeSegments.join('/')}`];
  });

const getProjectRoutes = () =>
  readdirSync(PROJECTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith('.md'))
    .sort()
    .map(
      (fileName) => `/projects/${fileName.replace(/^\d+\./, '').replace(/\.md$/, '')}`
    );

const routes = [...getPageRoutes(), ...getProjectRoutes(), '/not-found'].sort();

for (const route of routes) {
  test(`visual regression: ${route}`, async ({ page }) => {
    await page.addInitScript(() => {
      const freezeVideo = (video: HTMLVideoElement) => {
        video.autoplay = false;
        video.pause();
        video.addEventListener('play', () => video.pause());
      };

      const freezeVideos = () => {
        document.querySelectorAll('video').forEach(freezeVideo);
      };

      new MutationObserver(freezeVideos).observe(document, {
        childList: true,
        subtree: true,
      });
      document.addEventListener('DOMContentLoaded', freezeVideos);
    });

    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toBeAttached();
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content: '[data-visual-test-time] { visibility: hidden !important; }',
    });
    await page.waitForFunction(() =>
      Array.from(document.images)
        .filter((image) => image.loading !== 'lazy')
        .every((image) => image.complete && image.naturalWidth > 0)
    );
    await page.waitForTimeout(THEME_TRANSITION_DURATION);

    const workCards = page.locator('[data-card]');
    const workCardCount = await workCards.count();
    if (workCardCount) {
      await Promise.all(
        Array.from({ length: workCardCount }, (_, index) =>
          expect(workCards.nth(index)).toHaveCSS('opacity', '1')
        )
      );
    }

    await expect(page).toHaveScreenshot(
      `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}.png`,
      {
        animations: 'disabled',
        caret: 'hide',
        fullPage: false,
      }
    );
  });
}
