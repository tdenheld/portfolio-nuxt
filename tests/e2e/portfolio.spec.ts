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

test('carousel keeps only cloned slides out of the keyboard tree', async ({
  page,
}) => {
  await page.goto('/');

  const carousel = page.locator('[data-scroller-carousel]');
  const slides = carousel.locator(':scope > div');

  await expect(carousel).toBeVisible();
  const slideCount = await slides.count();
  expect(slideCount).toBeGreaterThan(1);
  expect(await carousel.locator(':scope > [inert]').count()).toBe(slideCount / 2);
});

test('carousel Explore link supports pointer navigation', async ({ page }) => {
  await page.goto('/');

  const carousel = page.locator('[data-scroller-carousel]');
  await carousel.evaluate((element) => {
    const nextSlide = element.children[1] as HTMLElement;
    element.scrollTo({ top: nextSlide.offsetTop - element.offsetTop });
  });

  const exploreLink = carousel.locator(
    ':scope > :not([inert]) a[href="/projects/dutch-railways"]'
  );
  await expect(exploreLink).toBeVisible();
  await exploreLink.click();
  await expect(page).toHaveURL(/\/projects\/dutch-railways$/);
});

test('carousel Explore link supports keyboard navigation', async ({ page }) => {
  await page.goto('/');

  const carousel = page.locator('[data-scroller-carousel]');
  const firstExploreLink = carousel.locator(
    ':scope > :not([inert]) a[href="/projects/dutch-railways"]'
  );
  const nextExploreLink = carousel.locator(
    ':scope > :not([inert]) a[href="/projects/vpro"]'
  );

  await firstExploreLink.focus();
  await expect(firstExploreLink).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(nextExploreLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/projects\/vpro$/);
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
