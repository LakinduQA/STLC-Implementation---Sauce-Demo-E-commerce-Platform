/**
 * Playwright Configuration for Sauce Demo STLC Project
 * IEEE YP 2025 - JavaScript Implementation
 */

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Test directory
  testDir: './tests',
  
  // Global test timeout
  timeout: 30 * 1000,
  
  // Expect timeout for assertions
  expect: {
    timeout: 5000,
  },
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests
  retries: process.env.CI ? 2 : 0,
  
  // Number of parallel workers
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['list']
  ],
  
  // Global test setup and teardown
  globalSetup: require.resolve('./config/global-setup.js'),
  globalTeardown: require.resolve('./config/global-teardown.js'),
  
  // Test configuration
  use: {
    // Base URL for tests
    baseURL: 'https://www.saucedemo.com/v1/',
    
    // Browser context options
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Additional context options
    ignoreHTTPSErrors: true,
    
    // Viewport size
    viewport: { width: 1280, height: 720 },
    
    // User agent
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    
    // Permissions
    permissions: [],
    
    // Geolocation
    geolocation: { longitude: -74.006, latitude: 40.7128 },
    
    // Locale and timezone
    locale: 'en-US',
    timezoneId: 'America/New_York',
    
    // Color scheme
    colorScheme: 'light',
    
    // Action timeout
    actionTimeout: 10000,
    
    // Navigation timeout
    navigationTimeout: 30000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: process.env.CI ? true : false
      },
    },
    
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        headless: process.env.CI ? true : false
      },
    },
    
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        headless: process.env.CI ? true : false
      },
    },

    // Mobile testing
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        headless: process.env.CI ? true : false
      },
    },
    
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        headless: process.env.CI ? true : false
      },
    },

    // Edge browser
    {
      name: 'Microsoft Edge',
      use: { 
        ...devices['Desktop Edge'],
        channel: 'msedge',
        headless: process.env.CI ? true : false
      },
    },
  ],

  // Output directory for test artifacts
  outputDir: 'test-results/',

  // Web server configuration for local development
  webServer: process.env.LOCAL_SERVER ? {
    command: 'npm run serve',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  } : undefined,

  // Test match patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],

  // Files to ignore
  testIgnore: [
    '**/node_modules/**',
    '**/test-results/**',
    '**/playwright-report/**'
  ],

  // Metadata
  metadata: {
    project: 'Sauce Demo STLC Automation',
    version: '1.0.0',
    author: 'IEEE YP 2025',
    description: 'Comprehensive e-commerce testing automation framework'
  },

  // Grep options for test filtering
  grep: process.env.TEST_GREP ? new RegExp(process.env.TEST_GREP) : undefined,
  grepInvert: process.env.TEST_GREP_INVERT ? new RegExp(process.env.TEST_GREP_INVERT) : undefined,

  // Maximum failures before stopping
  maxFailures: process.env.CI ? 0 : undefined,

  // Update snapshots mode
  updateSnapshots: 'missing',

  // Shard configuration for parallel execution
  shard: process.env.SHARD ? {
    current: parseInt(process.env.SHARD_CURRENT) || 1,
    total: parseInt(process.env.SHARD_TOTAL) || 1
  } : undefined,
});
