/**
 * Cart Page Object - Handles shopping cart functionality
 * Sauce Demo STLC Project - IEEE YP 2025
 */

const BasePage = require('./BasePage');

class CartPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Cart page selectors
        this.selectors = {
            cartList: '.cart_list',
            cartItems: '.cart_item',
            cartItemNames: '.inventory_item_name',
            cartItemPrices: '.inventory_item_price',
            cartQuantities: '.cart_quantity',
            removeButtons: "//button[@class='btn_secondary cart_button']",
            continueShoppingButton: "//a[@class='btn_secondary']",
            checkoutButton: "//a[@class='btn_action checkout_button']",
            cartBadge: '.shopping_cart_badge'
        };
    }

    /**
     * Navigate to cart page
     */
    async navigateToCart() {
        await this.navigate('cart.html');
        await this.waitForElement(this.selectors.cartList);
    }

    /**
     * Check if on cart page
     * @returns {Promise<boolean>} True if on cart page
     */
    async isOnCartPage() {
        const url = await this.getCurrentUrl();
        return url.includes('cart.html');
    }

    /**
     * Get all cart item names
     * @returns {Promise<string[]>} Array of item names in cart
     */
    async getCartItemNames() {
        if (await this.isElementVisible(this.selectors.cartItemNames)) {
            return await this.page.$$eval(this.selectors.cartItemNames, 
                elements => elements.map(el => el.textContent.trim())
            );
        }
        return [];
    }

    /**
     * Get all cart item prices
     * @returns {Promise<string[]>} Array of item prices in cart
     */
    async getCartItemPrices() {
        if (await this.isElementVisible(this.selectors.cartItemPrices)) {
            return await this.page.$$eval(this.selectors.cartItemPrices, 
                elements => elements.map(el => el.textContent.trim())
            );
        }
        return [];
    }

    /**
     * Get number of items in cart
     * @returns {Promise<number>} Number of items in cart
     */
    async getCartItemCount() {
        if (await this.isElementVisible(this.selectors.cartItems)) {
            return await this.page.$$eval(this.selectors.cartItems, 
                elements => elements.length
            );
        }
        return 0;
    }

    /**
     * Remove item from cart by name
     * @param {string} itemName - Name of item to remove
     */
    async removeItemFromCart(itemName) {
        const removeButtonLocator = `//div[contains(@class, 'cart_item') and .//div[text()='${itemName}']]//button[contains(@class, 'btn_secondary')]`;
        await this.clickElement(removeButtonLocator);
    }

    /**
     * Remove item from cart by index
     * @param {number} index - Index of item to remove (0-based)
     */
    async removeItemByIndex(index) {
        const removeButtons = await this.page.$$(this.selectors.removeButtons);
        if (removeButtons[index]) {
            await removeButtons[index].click();
        }
    }

    /**
     * Click continue shopping button
     */
    async continueShopping() {
        try {
            await this.waitForElement(this.selectors.continueShoppingButton, 10000);
            await this.clickElement(this.selectors.continueShoppingButton);
            
            // Wait for navigation with longer timeout
            await this.page.waitForURL(url => url.toString().includes('inventory.html'), { timeout: 15000 });
            
            // Alternative wait for inventory page elements
            await this.page.waitForSelector('.inventory_list', { timeout: 10000 });
            
        } catch (error) {
            console.error('Error in continueShopping:', error);
            // Try alternative navigation if direct click fails
            await this.navigate('inventory.html');
        }
    }

    /**
     * Click checkout button
     */
    async proceedToCheckout() {
        try {
            await this.waitForElement(this.selectors.checkoutButton, 10000);
            await this.clickElement(this.selectors.checkoutButton);
            
            // Wait for navigation to checkout page
            await this.page.waitForURL(url => url.toString().includes('checkout'), { timeout: 15000 });
            
        } catch (error) {
            console.error('Error in proceedToCheckout:', error);
            // Try alternative navigation if direct click fails
            await this.navigate('checkout-step-one.html');
        }
    }

    /**
     * Check if cart is empty
     * @returns {Promise<boolean>} True if cart is empty
     */
    async isCartEmpty() {
        return (await this.getCartItemCount()) === 0;
    }

    /**
     * Get cart badge count
     * @returns {Promise<string>} Cart badge number as string
     */
    async getCartBadgeCount() {
        if (await this.isElementVisible(this.selectors.cartBadge)) {
            const text = await this.getText(this.selectors.cartBadge);
            return text.toString();
        }
        return '0';
    }

    /**
     * Verify cart item details
     * @param {string} itemName - Item name to verify
     * @returns {Promise<boolean>} True if item exists with correct details
     */
    async verifyCartItem(itemName) {
        const itemNames = await this.getCartItemNames();
        return itemNames.includes(itemName);
    }

    /**
     * Get cart item quantity by name
     * @param {string} itemName - Item name
     * @returns {Promise<number>} Item quantity
     */
    async getCartItemQuantity(itemName) {
        const itemLocator = `//div[contains(@class, 'cart_item') and .//div[text()='${itemName}']]//div[@class='cart_quantity']`;
        if (await this.isElementVisible(itemLocator)) {
            const quantityText = await this.getText(itemLocator);
            return parseInt(quantityText) || 0;
        }
        return 0;
    }

    /**
     * Calculate total cart value from displayed prices
     * @returns {Promise<number>} Total cart value
     */
    async calculateTotalCartValue() {
        const prices = await this.getCartItemPrices();
        let total = 0;
        
        for (const price of prices) {
            const numericPrice = parseFloat(price.replace('$', ''));
            if (!isNaN(numericPrice)) {
                total += numericPrice;
            }
        }
        
        return parseFloat(total.toFixed(2));
    }

    /**
     * Clear all items from cart
     */
    async clearCart() {
        const itemCount = await this.getCartItemCount();
        for (let i = 0; i < itemCount; i++) {
            await this.removeItemByIndex(0); // Always remove first item
            await this.page.waitForTimeout(500); // Small delay for UI update
        }
    }

    /**
     * Verify cart page is loaded correctly
     * @returns {Promise<boolean>} True if cart page is loaded
     */
    async verifyCartPageLoaded() {
        return await this.isElementVisible(this.selectors.cartList) &&
               await this.isElementVisible(this.selectors.continueShoppingButton) &&
               await this.isElementVisible(this.selectors.checkoutButton);
    }

    /**
     * Verify cart page elements are present
     * @returns {Promise<boolean>} True if all elements are present
     */
    async verifyCartPageElements() {
        const elements = [
            this.selectors.cartList,
            this.selectors.continueShoppingButton,
            this.selectors.checkoutButton
        ];

        for (const selector of elements) {
            if (!(await this.isElementVisible(selector))) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get cart item details by name or all items
     * @param {string} [itemName] - Name of the item (optional)
     * @returns {Promise<Object|Array>} Item details object or array of all items
     */
    async getCartItemDetails(itemName = null) {
        try {
            if (itemName) {
                // Get specific item details
                const itemLocator = `//div[contains(@class, 'cart_item') and .//div[contains(@class, 'inventory_item_name') and text()='${itemName}']]`;
                
                if (await this.isElementVisible(itemLocator)) {
                    const nameElement = await this.page.locator(`${itemLocator}//div[@class='inventory_item_name']`);
                    const priceElement = await this.page.locator(`${itemLocator}//div[@class='inventory_item_price']`);
                    const quantityElement = await this.page.locator(`${itemLocator}//div[@class='cart_quantity']`);
                    
                    return {
                        name: await nameElement.textContent(),
                        price: await priceElement.textContent(),
                        quantity: await quantityElement.textContent()
                    };
                }
                return null;
            } else {
                // Get all cart item details
                const cartItems = await this.page.$$(this.selectors.cartItems);
                const details = [];
                
                for (const item of cartItems) {
                    const nameEl = await item.$('.inventory_item_name');
                    const priceEl = await item.$('.inventory_item_price');
                    const quantityEl = await item.$('.cart_quantity');
                    
                    if (nameEl && priceEl && quantityEl) {
                        let name = await nameEl.textContent();
                        let price = await priceEl.textContent();
                        let quantity = await quantityEl.textContent();
                        
                        // Ensure price has $ prefix if missing
                        if (price && !price.startsWith('$')) {
                            price = '$' + price;
                        }
                        
                        details.push({
                            name: name.trim(),
                            price: price.trim(),
                            quantity: quantity.trim()
                        });
                    }
                }
                
                return details;
            }
        } catch (error) {
            console.error('Error getting cart item details:', error);
            return itemName ? null : [];
        }
    }

    /**
     * Check if cart badge is visible
     * @returns {Promise<boolean>} True if cart badge is visible
     */
    async isCartBadgeVisible() {
        return await this.isElementVisible(this.selectors.cartBadge);
    }
}

module.exports = CartPage;
