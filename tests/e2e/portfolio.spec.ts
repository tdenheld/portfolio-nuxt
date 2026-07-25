import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  { path: '/', heading: 'Design Engineer / Creative Developer' },
  { path: '/projects', heading: 'Selected Work' },
  { path: '/about', heading: 'About' },
  { path: '/projects/dutch-railways', heading: 'Dutch Railways' },
];

test.describe('portfolio routes', () => {
  for (const { path, heading } of routes) {
    test(`${path} renders its page heading without runtime errors`, async ({
      page,
    }) => {
      const pageErrors: string[] = [];
      page.on('pageerror', (error) => pageErrors.push(error.message));

      await page.goto(path);

      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toContainText(heading);
      expect(pageErrors).toEqual([]);
    });
  }
});

test('carousel exposes only its active slide', async ({ page }) => {
  await page.goto('/');

  const carousel = page.locator('[data-scroller-carousel]');
  const slides = carousel.locator(':scope > div');

  await expect(carousel).toBeVisible();
  const slideCount = await slides.count();
  expect(slideCount).toBeGreaterThan(1);
  await expect(carousel.locator(':scope > [aria-hidden="false"]')).toHaveCount(1);
  expect(await carousel.locator(':scope > [inert]').count()).toBe(slideCount - 1);
});

for (const { path, name } of [
  { path: '/', name: 'Home carousel' },
  { path: '/projects/dutch-railways', name: 'project detail' },
]) {
  test(`${name} has no detectable accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);

    const results = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
