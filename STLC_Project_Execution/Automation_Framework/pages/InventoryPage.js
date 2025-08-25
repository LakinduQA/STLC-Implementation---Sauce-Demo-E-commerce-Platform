/**
 * Inventory Page Object - Handles product catalog functionality
 * Sauce Demo STLC Project - IEEE YP 2025
 */

const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Inventory page selectors
        this.selectors = {
            inventoryContainer: '.inventory_container',
            inventoryList: '.inventory_list',
            inventoryItems: '.inventory_item',
            sortDropdown: '.product_sort_container',
            productNames: '.inventory_item_name',
            productPrices: '.inventory_item_price',
            productImages: '.inventory_item_img img',
            addToCartButtons: '.btn_primary.btn_inventory',
            removeButtons: '.btn_secondary.btn_inventory',
            cartBadge: '.shopping_cart_badge',
            cartLink: '.shopping_cart_link',
            menuButton: '#react-burger-menu-btn',
            logoutButton: '#logout_sidebar_link'
        };
    }

    /**
     * Navigate to inventory page
     */
    async navigateToInventory() {
        await this.navigate('inventory.html');
        await this.waitForElement(this.selectors.inventoryContainer);
    }

    /**
     * Check if on inventory page
     * @returns {Promise<boolean>} True if on inventory page
     */
    async isOnInventoryPage() {
        const url = await this.getCurrentUrl();
        return url.includes('inventory.html') && 
               await this.isElementVisible(this.selectors.inventoryContainer);
    }

    /**
     * Get all product names
     * @returns {Promise<string[]>} Array of product names
     */
    async getProductNames() {
        await this.waitForElement(this.selectors.productNames);
        return await this.page.$$eval(this.selectors.productNames, 
            elements => elements.map(el => el.textContent.trim())
        );
    }

    /**
     * Get all product prices
     * @returns {Promise<string[]>} Array of product prices
     */
    async getProductPrices() {
        await this.waitForElement(this.selectors.productPrices);
        return await this.page.$$eval(this.selectors.productPrices, 
            elements => elements.map(el => el.textContent.trim())
        );
    }

    /**
     * Get number of products displayed
     * @returns {Promise<number>} Number of products
     */
    async getProductCount() {
        await this.waitForElement(this.selectors.inventoryItems);
        return await this.page.$$eval(this.selectors.inventoryItems, 
            elements => elements.length
        );
    }

    /**
     * Sort products by option
     * @param {string} sortOption - Sort option value (az, za, lohi, hilo)
     */
    async sortProducts(sortOption) {
        await this.clickElement(this.selectors.sortDropdown);
        await this.page.selectOption(this.selectors.sortDropdown, sortOption);
        await this.waitForNavigation();
    }

    /**
     * Add product to cart by name
     * @param {string} productName - Name of product to add
     */
    async addProductToCart(productName) {
        const productLocator = `//div[contains(@class, 'inventory_item') and .//div[text()='${productName}']]//button[contains(@class, 'btn_primary')]`;
        await this.clickElement(productLocator);
    }

    /**
     * Add product to cart by index
     * @param {number} index - Index of product (0-based)
     */
    async addProductToCartByIndex(index) {
        const buttons = await this.page.$$(this.selectors.addToCartButtons);
        if (buttons[index]) {
            await buttons[index].click();
        }
    }

    /**
     * Remove product from cart by name
     * @param {string} productName - Name of product to remove
     */
    async removeProductFromCart(productName) {
        const productLocator = `//div[contains(@class, 'inventory_item') and .//div[text()='${productName}']]//button[contains(@class, 'btn_secondary')]`;
        await this.clickElement(productLocator);
    }

    /**
     * Get cart badge count
     * @returns {Promise<string>} Cart item count as string
     */
    async getCartBadgeCount() {
        if (await this.isElementVisible(this.selectors.cartBadge)) {
            const text = await this.getText(this.selectors.cartBadge);
            return text.toString();
        }
        return '0';
    }

    /**
     * Click on cart icon
     */
    async clickCart() {
        await this.clickElement(this.selectors.cartLink);
        await this.waitForNavigation();
    }

    /**
     * Navigate to cart page (alias for clickCart)
     */
    async goToCart() {
        await this.clickCart();
    }

    /**
     * Get add to cart button text for a specific product
     * @param {string} productName - Name of the product
     * @returns {Promise<string>} Button text (Add to cart or Remove)
     */
    async getAddToCartButtonText(productName) {
        const productLocator = `//div[contains(@class, 'inventory_item') and .//div[contains(@class, 'inventory_item_name') and text()='${productName}']]//button`;
        const button = await this.page.locator(productLocator);
        return await button.textContent();
    }

    /**
     * Click on product name to view details
     * @param {string} productName - Name of product
     */
    async clickProductName(productName) {
        const productLocator = `//div[@class='inventory_item_name' and text()='${productName}']`;
        await this.clickElement(productLocator);
        await this.waitForNavigation();
    }

    /**
     * Verify all product images are loaded
     * @returns {Promise<boolean>} True if all images are loaded
     */
    async verifyProductImagesLoaded() {
        const images = await this.page.$$(this.selectors.productImages);
        for (const img of images) {
            const src = await img.getAttribute('src');
            if (!src || src.includes('undefined')) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get current sort option
     * @returns {Promise<string>} Current sort option value
     */
    async getCurrentSortOption() {
        return await this.page.inputValue(this.selectors.sortDropdown);
    }

    /**
     * Logout from application
     */
    async logout() {
        await this.clickElement(this.selectors.menuButton);
        await this.waitForElement(this.selectors.logoutButton);
        await this.clickElement(this.selectors.logoutButton);
        await this.waitForNavigation();
    }

    /**
     * Verify inventory page is loaded correctly
     * @returns {Promise<boolean>} True if page is loaded correctly
     */
    async verifyInventoryPageLoaded() {
        return await this.isElementVisible(this.selectors.inventoryContainer) &&
               await this.isElementVisible(this.selectors.inventoryList) &&
               (await this.getProductCount()) > 0;
    }

    /**
     * Verify inventory page elements are present and functional
     * @returns {Promise<void>}
     */
    async verifyInventoryPageElements() {
        // Verify main containers
        await this.waitForElement(this.selectors.inventoryContainer);
        await this.waitForElement(this.selectors.inventoryList);
        
        // Verify products are displayed
        const productCount = await this.getProductCount();
        if (productCount === 0) {
            throw new Error('No products found on inventory page');
        }
        
        // Verify sort dropdown is present
        await this.waitForElement(this.selectors.sortDropdown);
        
        // Verify cart link is present
        await this.waitForElement(this.selectors.cartLink);
        
        return true;
    }

    /**
     * Get all product details (name, price, description)
     * @returns {Promise<Array>} Array of product detail objects
     */
    async getAllProductDetails() {
        await this.waitForElement(this.selectors.inventoryItems);
        
        const productDetails = await this.page.$$eval(this.selectors.inventoryItems, (items) => {
            return items.map(item => {
                const nameElement = item.querySelector('.inventory_item_name');
                const priceElement = item.querySelector('.inventory_item_price');
                const descElement = item.querySelector('.inventory_item_desc');
                
                return {
                    name: nameElement ? nameElement.textContent.trim() : '',
                    price: priceElement ? priceElement.textContent.trim() : '',
                    description: descElement ? descElement.textContent.trim() : ''
                };
            });
        });
        
        return productDetails;
    }

    /**
     * Get all product images
     * @returns {Promise<Array>} Array of product image sources
     */
    async getAllProductImages() {
        await this.waitForElement(this.selectors.productImages);
        
        const imageSources = await this.page.$$eval(this.selectors.productImages, (images) => {
            return images.map(img => ({
                src: img.src,
                alt: img.alt,
                loaded: img.complete && img.naturalHeight !== 0
            }));
        });
        
        return imageSources;
    }

    /**
     * Verify all product images are loaded and valid
     * @returns {Promise<boolean>} True if all images are valid
     */
    async verifyAllProductImagesLoaded() {
        try {
            // Wait for images to be present first
            await this.page.waitForSelector(this.selectors.productImages, { timeout: 5000 });
            
            const images = await this.page.$$eval(this.selectors.productImages, (images) => {
                return images.map(img => ({
                    src: img.src,
                    alt: img.alt,
                    complete: img.complete,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight
                }));
            });
            
            console.log('Found images:', images.length);
            console.log('Image details:', images);
            
            // Check that we have images
            if (images.length === 0) {
                console.log('No images found');
                return false;
            }
            
            // Check that all images are loaded and have valid sources
            const allLoaded = images.every(img => 
                img.complete && 
                img.naturalWidth > 0 && 
                img.naturalHeight > 0 &&
                img.src && 
                !img.src.includes('undefined')
            );
            
            console.log('All images loaded:', allLoaded);
            return allLoaded;
        } catch (error) {
            console.error('Error verifying product images:', error);
            return false;
        }
    }

    /**
     * Check if cart badge is visible
     * @returns {Promise<boolean>} True if cart badge is visible
     */
    async isCartBadgeVisible() {
        return await this.isElementVisible(this.selectors.cartBadge);
    }

    /**
     * Alias for verifyAllProductImagesLoaded for backwards compatibility
     * @returns {Promise<boolean>} True if all images are loaded
     */
    async areAllImagesLoaded() {
        return await this.verifyAllProductImagesLoaded();
    }
}

module.exports = InventoryPage;
