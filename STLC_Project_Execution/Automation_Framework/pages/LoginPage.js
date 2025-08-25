/**
 * Login Page Object - Handles login functionality
 * Sauce Demo STLC Project - IEEE YP 2025
 */

const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Login page selectors
        this.selectors = {
            usernameInput: '#user-name',
            passwordInput: '#password',
            loginButton: '#login-button',
            errorMessage: '[data-test="error"]',
            errorButton: '[data-test="error"] button'
        };
    }

    /**
     * Navigate to login page
     */
    async navigateToLogin() {
        await this.navigate();
        await this.waitForElement(this.selectors.loginButton);
    }

    /**
     * Perform login with credentials
     * @param {string} username - Username
     * @param {string} password - Password
     */
    async login(username, password) {
        await this.typeText(this.selectors.usernameInput, username);
        await this.typeText(this.selectors.passwordInput, password);
        await this.clickElement(this.selectors.loginButton);
        
        // Wait for either navigation or error
        try {
            await this.page.waitForLoadState('networkidle', { timeout: 10000 });
        } catch (error) {
            // Continue - might be an error case
        }
    }

    /**
     * Check if error message is displayed
     * @returns {Promise<boolean>} True if error is visible
     */
    async isErrorMessageVisible() {
        return await this.isElementVisible(this.selectors.errorMessage);
    }

    /**
     * Get error message text
     * @returns {Promise<string>} Error message text
     */
    async getErrorMessage() {
        if (await this.isErrorMessageVisible()) {
            return await this.getText(this.selectors.errorMessage);
        }
        return '';
    }

    /**
     * Clear error message by clicking X button
     */
    async clearErrorMessage() {
        if (await this.isErrorMessageVisible()) {
            await this.clickElement(this.selectors.errorButton);
        }
    }

    /**
     * Check if currently on login page
     * @returns {Promise<boolean>} True if on login page
     */
    async isOnLoginPage() {
        const url = await this.getCurrentUrl();
        return url.includes('index.html') || url.endsWith('/v1/');
    }

    /**
     * Get username input value
     * @returns {Promise<string>} Username value
     */
    async getUsernameValue() {
        return await this.page.inputValue(this.selectors.usernameInput);
    }

    /**
     * Get password input value
     * @returns {Promise<string>} Password value
     */
    async getPasswordValue() {
        return await this.page.inputValue(this.selectors.passwordInput);
    }

    /**
     * Clear username field
     */
    async clearUsername() {
        await this.page.fill(this.selectors.usernameInput, '');
    }

    /**
     * Clear password field
     */
    async clearPassword() {
        await this.page.fill(this.selectors.passwordInput, '');
    }

    /**
     * Verify login page elements are present
     * @returns {Promise<boolean>} True if all elements are present
     */
    async verifyLoginPageElements() {
        const elements = [
            this.selectors.usernameInput,
            this.selectors.passwordInput,
            this.selectors.loginButton
        ];

        for (const selector of elements) {
            if (!(await this.isElementVisible(selector))) {
                return false;
            }
        }
        return true;
    }
}

module.exports = LoginPage;
