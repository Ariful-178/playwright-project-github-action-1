import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Use either testDir or testMatch, not both (commented out testDir)
  // testDir: './tests',
  testMatch: [
    "home.test.ts",
  ],

  // Fixed timeout values (removed extra zeros)
  timeout: 30 * 1000, // 30 seconds
  expect: {
    timeout: 30 * 1000, // 30 seconds
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.1, // Changed from 10 to 0.1 (10% to 1%)
    },
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.05, // Changed from 0.5 to 0.05 (50% to 5%)
    }
  },

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0, // Added retries for CI
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined, // Let Playwright determine optimal workers locally

  /* Reporter to use */
  reporter: process.env.CI ? [
    ['junit', { outputFile: 'results.xml' }],
    ['html'] // Added HTML reporter for CI
  ] : [
    ['list'],
    ['html', { open: 'on-failure' }] // Open HTML report only on failures
  ],

  use: {
    // Fixed timeout values
    actionTimeout: 10 * 1000, // 10 seconds
    navigationTimeout: 30 * 1000, // 30 seconds
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    launchOptions: {
      args: [
        '--no-sandbox',
        '--use-fake-device-for-media-stream',
        '--use-fake-ui-for-media-stream',
        '--disable-features=useOzonePlatform',
        `--use-file-for-fake-video-capture=${__dirname}/VR.y4m`,
      ],
      // Added slowMo for better visibility during local testing
      slowMo: process.env.CI ? 0 : 100
    },
    permissions: ['geolocation', 'notifications', 'camera', 'microphone', 'clipboard-read', 'clipboard-write'],

    /* Trace and video settings */
    trace: 'retain-on-failure', // Always retain on failure
    headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure', // Better to retain videos on failure
    ignoreHTTPSErrors: true,
    screenshot: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    
   // { name: 'Auth', testMatch: "auth.setup.ts" },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/auth.json',
      },
     // dependencies: ['Auth'],

    },
    // Uncomment these if you want to test other browsers
    /*
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: '.auth/auth.json',
      },
      dependencies: ['Auth'],
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: '.auth/auth.json',
      },
      dependencies: ['Auth'],
    },
    */
  ],

  /* Run your local dev server before starting the tests */
  // Uncomment if you need to start a server
  /*
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  */
});