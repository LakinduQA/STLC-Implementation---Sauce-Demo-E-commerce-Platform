/**
 * Global Setup for Playwright Tests
 * Sauce Demo STLC Project - IEEE YP 2025
 */

const { chromium } = require('@playwright/test');
const TestUtils = require('../utils/TestUtils');

async function globalSetup(config) {
  console.log('🚀 Starting Global Setup for STLC Automation Tests...');
  
  try {
    // Ensure required directories exist
    TestUtils.ensureDirectoryExists('./test-results');
    TestUtils.ensureDirectoryExists('./test-results/screenshots');
    TestUtils.ensureDirectoryExists('./test-results/videos');
    TestUtils.ensureDirectoryExists('./test-results/traces');
    TestUtils.ensureDirectoryExists('./logs');
    
    // Log test execution start
    TestUtils.logTestExecution('Global Setup', 'START', 'Initializing test environment');
    
    // Verify application accessibility
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    console.log('🌐 Verifying application accessibility...');
    
    try {
      const baseURL = config.use?.baseURL || 'https://www.saucedemo.com/v1/';
      console.log('🔗 Connecting to application:', baseURL);
      
      await page.goto(baseURL, { waitUntil: 'networkidle' });
      
      // Check if login page loads correctly
      const loginButton = await page.locator('#login-button');
      await loginButton.waitFor({ state: 'visible', timeout: 10000 });
      
      console.log('✅ Application is accessible and responsive');
      TestUtils.logTestExecution('Application Check', 'PASS', 'Base URL accessible');
      
      // Capture initial performance metrics
      const performanceMetrics = await TestUtils.capturePerformanceMetrics(page);
      console.log('📊 Initial Performance Metrics:', performanceMetrics);
      
    } catch (error) {
      console.error('❌ Application accessibility check failed:', error.message);
      TestUtils.logTestExecution('Application Check', 'FAIL', error.message);
      throw new Error(`Application not accessible: ${error.message}`);
    }
    
    await context.close();
    await browser.close();
    
    // Set environment variables for test execution
    process.env.TEST_START_TIME = new Date().toISOString();
    process.env.TEST_ENVIRONMENT = 'staging';
    
    console.log('✅ Global Setup completed successfully');
    TestUtils.logTestExecution('Global Setup', 'COMPLETE', 'Environment ready for testing');
    
  } catch (error) {
    console.error('❌ Global Setup failed:', error.message);
    TestUtils.logTestExecution('Global Setup', 'FAIL', error.message);
    throw error;
  }
}

module.exports = globalSetup;
