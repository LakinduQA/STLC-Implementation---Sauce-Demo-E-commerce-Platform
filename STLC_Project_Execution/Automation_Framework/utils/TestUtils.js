/**
 * Test Utilities - Helper functions for automation tests
 * Sauce Demo STLC Project - IEEE YP 2025
 */

const fs = require('fs');
const path = require('path');

class TestUtils {
    /**
     * Generate a random string of specified length
     * @param {number} length - Length of the string
     * @param {string} charset - Character set to use
     * @returns {string} Random string
     */
    static generateRandomString(length = 10, charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return result;
    }

    /**
     * Generate random email address
     * @param {string} domain - Email domain (default: testdomain.com)
     * @returns {string} Random email address
     */
    static generateRandomEmail(domain = 'testdomain.com') {
        const username = this.generateRandomString(8).toLowerCase();
        return `${username}@${domain}`;
    }

    /**
     * Format currency string to number
     * @param {string} currencyString - Currency string like "$29.99"
     * @returns {number} Numeric value
     */
    static parseCurrency(currencyString) {
        return parseFloat(currencyString.replace(/[$,]/g, ''));
    }

    /**
     * Format number to currency string
     * @param {number} amount - Numeric amount
     * @returns {string} Formatted currency string
     */
    static formatCurrency(amount) {
        return `$${amount.toFixed(2)}`;
    }

    /**
     * Calculate tax amount
     * @param {number} subtotal - Subtotal amount
     * @param {number} taxRate - Tax rate (default: 0.08 for 8%)
     * @returns {number} Tax amount
     */
    static calculateTax(subtotal, taxRate = 0.08) {
        return parseFloat((subtotal * taxRate).toFixed(2));
    }

    /**
     * Wait for a specified duration
     * @param {number} milliseconds - Duration to wait
     * @returns {Promise} Promise that resolves after the wait
     */
    static async wait(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    /**
     * Retry a function with exponential backoff
     * @param {Function} fn - Function to retry
     * @param {number} maxRetries - Maximum number of retries
     * @param {number} baseDelay - Base delay in milliseconds
     * @returns {Promise} Promise that resolves with the function result
     */
    static async retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
        let lastError;
        
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error;
                
                if (attempt === maxRetries) {
                    throw error;
                }
                
                const delay = baseDelay * Math.pow(2, attempt);
                console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
                await this.wait(delay);
            }
        }
        
        throw lastError;
    }

    /**
     * Generate current timestamp in various formats
     * @param {string} format - Format type (iso, timestamp, readable)
     * @returns {string} Formatted timestamp
     */
    static getCurrentTimestamp(format = 'iso') {
        const now = new Date();
        
        switch (format) {
            case 'timestamp':
                return now.getTime().toString();
            case 'readable':
                return now.toLocaleString();
            case 'filename':
                return now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
            default:
                return now.toISOString();
        }
    }

    /**
     * Create directory if it doesn't exist
     * @param {string} dirPath - Directory path
     */
    static ensureDirectoryExists(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    /**
     * Save screenshot with enhanced error handling
     * @param {Object} page - Playwright page object
     * @param {string} testName - Test name for filename
     * @param {string} screenshotDir - Screenshot directory
     * @returns {string} Screenshot path
     */
    static async saveScreenshot(page, testName, screenshotDir = './screenshots') {
        try {
            // Check if page is still available
            if (!page || page.isClosed()) {
                console.log(`⚠️ Cannot save screenshot for ${testName}: Page is closed or unavailable`);
                return null;
            }

            this.ensureDirectoryExists(screenshotDir);
            
            const timestamp = this.getCurrentTimestamp('filename');
            const filename = `${testName}_${timestamp}.png`;
            const screenshotPath = path.join(screenshotDir, filename);
            
            await page.screenshot({
                path: screenshotPath,
                fullPage: true,
                timeout: 5000 // Add timeout to prevent hanging
            });
            
            console.log(`📸 Screenshot saved: ${screenshotPath}`);
            return screenshotPath;
        } catch (error) {
            console.log(`⚠️ Failed to save screenshot for ${testName}: ${error.message}`);
            return null;
        }
    }

    /**
     * Log test execution details
     * @param {string} testName - Test name
     * @param {string} status - Test status (PASS/FAIL)
     * @param {string} details - Additional details
     * @param {string} logDir - Log directory
     */
    static logTestExecution(testName, status, details = '', logDir = './logs') {
        this.ensureDirectoryExists(logDir);
        
        const timestamp = this.getCurrentTimestamp('readable');
        const logEntry = `[${timestamp}] ${testName}: ${status} - ${details}\n`;
        const logFile = path.join(logDir, `test_execution_${this.getCurrentTimestamp('filename').slice(0, 10)}.log`);
        
        fs.appendFileSync(logFile, logEntry);
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid email format
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate postal code format (basic validation)
     * @param {string} postalCode - Postal code to validate
     * @returns {boolean} True if valid format
     */
    static isValidPostalCode(postalCode) {
        // Basic validation - alphanumeric with optional spaces/hyphens
        const postalRegex = /^[a-zA-Z0-9\s\-]{3,10}$/;
        return postalRegex.test(postalCode);
    }

    /**
     * Generate test report summary
     * @param {Array} testResults - Array of test result objects
     * @returns {Object} Test summary
     */
    static generateTestSummary(testResults) {
        const total = testResults.length;
        const passed = testResults.filter(result => result.status === 'PASS').length;
        const failed = testResults.filter(result => result.status === 'FAIL').length;
        const skipped = testResults.filter(result => result.status === 'SKIP').length;
        
        return {
            total,
            passed,
            failed,
            skipped,
            passRate: total > 0 ? ((passed / total) * 100).toFixed(2) : 0,
            failRate: total > 0 ? ((failed / total) * 100).toFixed(2) : 0
        };
    }

    /**
     * Compare arrays for equality
     * @param {Array} arr1 - First array
     * @param {Array} arr2 - Second array
     * @returns {boolean} True if arrays are equal
     */
    static arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        
        return true;
    }

    /**
     * Deep clone an object
     * @param {Object} obj - Object to clone
     * @returns {Object} Cloned object
     */
    static deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * Get browser information
     * @param {Object} browser - Playwright browser object
     * @returns {Object} Browser information
     */
    static async getBrowserInfo(browser) {
        const version = await browser.version();
        const name = browser.browserType().name();
        
        return {
            name,
            version,
            userAgent: await browser.newPage().then(page => page.evaluate(() => navigator.userAgent))
        };
    }

    /**
     * Capture performance metrics
     * @param {Object} page - Playwright page object
     * @returns {Object} Performance metrics
     */
    static async capturePerformanceMetrics(page) {
        const metrics = await page.evaluate(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            return {
                loadTime: perfData.loadEventEnd - perfData.navigationStart,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
                firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
                firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0
            };
        });
        
        return metrics;
    }

    /**
     * Check if element is in viewport
     * @param {Object} page - Playwright page object
     * @param {string} selector - Element selector
     * @returns {boolean} True if element is in viewport
     */
    static async isElementInViewport(page, selector) {
        return await page.evaluate((sel) => {
            const element = document.querySelector(sel);
            if (!element) return false;
            
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }, selector);
    }

    /**
     * Sanitize filename for cross-platform compatibility
     * @param {string} filename - Original filename
     * @returns {string} Sanitized filename
     */
    static sanitizeFilename(filename) {
        return filename.replace(/[<>:"/\\|?*]/g, '_').replace(/\s+/g, '_');
    }
}

module.exports = TestUtils;
