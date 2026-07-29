import { defineConfig, devices } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:3000';
const DESKTOP_VIEWPORT = { width: 1440, height: 1000 };
const MOBILE_VIEWPORT = { width: 390, height: 844 };

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: 'html',
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: DESKTOP_VIEWPORT,
      },
    },
    {
      name: 'desktop-firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: DESKTOP_VIEWPORT,
      },
    },
    {
      name: 'desktop-safari',
      use: {
        ...devices['Desktop Safari'],
        viewport: DESKTOP_VIEWPORT,
      },
    },
    {
      name: 'mobile-chromium',
      use: {
        ...devices['iPhone 13'],
        browserName: 'chromium',
        viewport: MOBILE_VIEWPORT,
      },
    },
    {
      name: 'mobile-firefox',
      use: {
        ...devices['iPhone 13'],
        browserName: 'firefox',
        viewport: MOBILE_VIEWPORT,
      },
    },
    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 13'],
        browserName: 'webkit',
        viewport: MOBILE_VIEWPORT,
      },
    },
  ],
  webServer: {
    command: 'npm run dev -- --port 3000',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
});
