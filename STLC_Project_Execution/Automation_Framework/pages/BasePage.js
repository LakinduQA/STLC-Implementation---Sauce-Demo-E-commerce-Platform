/**
 * Base Page Object - Contains common functionality for all pages
 * Sauce Demo STLC Project - IEEE YP 2025
 */

class BasePage {
    constructor(page) {
        this.page = page;
        this.baseUrl = 'https://www.saucedemo.com/v1/';
    }

    /**
     * Navigate to a specific URL
     * @param {string} path - Path to navigate to
     */
    async navigate(path = '') {
        const url = path ? `${this.baseUrl}${path}` : this.baseUrl;
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Wait for element to be visible
     * @param {string} selector - Element selector
     * @param {number} timeout - Wait timeout in milliseconds
     */
    async waitForElement(selector, timeout = 30000) {
        await this.page.waitForSelector(selector, { 
            state: 'visible', 
            timeout 
        });
    }

    /**
     * Click an element with wait
     * @param {string} selector - Element selector
     */
    async clickElement(selector) {
        await this.waitForElement(selector);
        await this.page.click(selector);
    }

    /**
     * Type text into an element
     * @param {string} selector - Element selector
     * @param {string} text - Text to type
     */
    async typeText(selector, text) {
        await this.waitForElement(selector);
        await this.page.fill(selector, text);
    }

    /**
     * Get text content from an element
     * @param {string} selector - Element selector
     * @returns {Promise<string>} Text content
     */
    async getText(selector) {
        await this.waitForElement(selector);
        return await this.page.textContent(selector);
    }

    /**
     * Check if element is visible
     * @param {string} selector - Element selector
     * @returns {Promise<boolean>} True if visible
     */
    async isElementVisible(selector) {
        try {
            await this.page.waitForSelector(selector, { 
                state: 'visible', 
                timeout: 5000 
            });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Take a screenshot
     * @param {string} name - Screenshot name
     */
    async takeScreenshot(name) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });
    }

    /**
     * Get current URL
     * @returns {Promise<string>} Current URL
     */
    async getCurrentUrl() {
        return this.page.url();
    }

    /**
     * Wait for navigation
     */
    async waitForNavigation() {
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = BasePage;
