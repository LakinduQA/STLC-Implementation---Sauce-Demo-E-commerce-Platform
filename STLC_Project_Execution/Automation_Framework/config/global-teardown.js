/**
 * Global Teardown for Playwright Tests
 * Sauce Demo STLC Project - IEEE YP 2025
 */

const TestUtils = require('../utils/TestUtils');
const fs = require('fs');
const path = require('path');

async function globalTeardown(config) {
  console.log('🧹 Starting Global Teardown for STLC Automation Tests...');
  
  try {
    // Log test execution end
    TestUtils.logTestExecution('Global Teardown', 'START', 'Cleaning up test environment');
    
    // Calculate total execution time
    const startTime = process.env.TEST_START_TIME;
    if (startTime) {
      const endTime = new Date();
      const executionTime = Math.round((endTime - new Date(startTime)) / 1000);
      console.log(`⏱️  Total execution time: ${executionTime} seconds`);
      TestUtils.logTestExecution('Execution Time', 'INFO', `${executionTime} seconds`);
    }
    
    // Generate test execution summary
    console.log('📊 Generating test execution summary...');
    
    // Read all log files to generate summary
    const logsDir = './logs';
    const testResults = [];
    
    if (fs.existsSync(logsDir)) {
      const logFiles = fs.readdirSync(logsDir).filter(file => file.endsWith('.log'));
      
      for (const logFile of logFiles) {
        const logPath = path.join(logsDir, logFile);
        const logContent = fs.readFileSync(logPath, 'utf8');
        
        // Parse log entries to extract test results
        const lines = logContent.split('\n').filter(line => line.trim());
        for (const line of lines) {
          if (line.includes('PASS') || line.includes('FAIL') || line.includes('SKIP')) {
            const parts = line.split(': ');
            if (parts.length >= 2) {
              const testName = parts[1].split(' - ')[0];
              const status = line.includes('PASS') ? 'PASS' : 
                           line.includes('FAIL') ? 'FAIL' : 'SKIP';
              testResults.push({ name: testName, status });
            }
          }
        }
      }
    }
    
    // Generate and display summary
    if (testResults.length > 0) {
      const summary = TestUtils.generateTestSummary(testResults);
      console.log('📈 Test Execution Summary:');
      console.log(`   Total Tests: ${summary.total}`);
      console.log(`   Passed: ${summary.passed} (${summary.passRate}%)`);
      console.log(`   Failed: ${summary.failed} (${summary.failRate}%)`);
      console.log(`   Skipped: ${summary.skipped}`);
      
      // Save summary to file
      const summaryFile = path.join('./test-results', 'execution-summary.json');
      fs.writeFileSync(summaryFile, JSON.stringify({
        ...summary,
        timestamp: new Date().toISOString(),
        executionTime: startTime ? Math.round((new Date() - new Date(startTime)) / 1000) : 0
      }, null, 2));
      
      console.log(`💾 Summary saved to: ${summaryFile}`);
    }
    
    // Clean up temporary files if needed
    console.log('🗑️  Cleaning up temporary files...');
    
    // Archive old screenshots (keep only last 10 runs)
    const screenshotsDir = './test-results/screenshots';
    if (fs.existsSync(screenshotsDir)) {
      const screenshots = fs.readdirSync(screenshotsDir)
        .filter(file => file.endsWith('.png'))
        .map(file => ({
          name: file,
          path: path.join(screenshotsDir, file),
          time: fs.statSync(path.join(screenshotsDir, file)).mtime
        }))
        .sort((a, b) => b.time - a.time);
      
      // Keep only the 50 most recent screenshots
      const screenshotsToDelete = screenshots.slice(50);
      for (const screenshot of screenshotsToDelete) {
        try {
          fs.unlinkSync(screenshot.path);
        } catch (error) {
          console.warn(`⚠️  Could not delete screenshot: ${screenshot.name}`);
        }
      }
      
      if (screenshotsToDelete.length > 0) {
        console.log(`🗑️  Cleaned up ${screenshotsToDelete.length} old screenshots`);
      }
    }
    
    // Display artifact locations
    console.log('📁 Test Artifacts:');
    console.log('   📊 HTML Report: ./playwright-report/index.html');
    console.log('   📸 Screenshots: ./test-results/screenshots/');
    console.log('   🎥 Videos: ./test-results/videos/');
    console.log('   🔍 Traces: ./test-results/traces/');
    console.log('   📝 Logs: ./logs/');
    
    // Final cleanup message
    console.log('✅ Global Teardown completed successfully');
    TestUtils.logTestExecution('Global Teardown', 'COMPLETE', 'Test environment cleaned up');
    
  } catch (error) {
    console.error('❌ Global Teardown failed:', error.message);
    TestUtils.logTestExecution('Global Teardown', 'FAIL', error.message);
    // Don't throw error in teardown to avoid masking test failures
  }
}

module.exports = globalTeardown;
