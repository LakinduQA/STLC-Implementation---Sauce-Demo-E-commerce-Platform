/**
 * Product Catalog Tests - Inventory Module  
 * Sauce Demo STLC Project - IEEE YP 2025
 * Tests: TC009, TC010, TC011, TC012, TC013
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const TestData = require('../../utils/TestData');
const TestUtils = require('../../utils/TestUtils');

test.describe('Product Catalog Module Tests', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    
    // Login with standard user before each test
    await loginPage.navigateToLogin();
    await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
    await expect(page).toHaveURL(TestData.urls.inventory);
  });

  test('TC009: Product Catalog Display Verification @smoke @regression', async ({ page }) => {
    const testName = 'TC009_Product_Catalog_Display';
    
    try {
      await test.step('Verify all required page elements are present', async () => {
        await inventoryPage.verifyInventoryPageElements();
      });
      
      await test.step('Verify all 6 products are displayed', async () => {
        const products = await inventoryPage.getProductNames();
        expect(products).toHaveLength(6);
        
        // Verify all expected products are present
        const expectedProducts = Object.values(TestData.products).map(p => p.name);
        for (const expectedProduct of expectedProducts) {
          expect(products).toContain(expectedProduct);
        }
        
        console.log('All 6 products displayed correctly');
      });
      
      await test.step('Verify product details are displayed', async () => {
        const productDetails = await inventoryPage.getAllProductDetails();
        
        for (const product of productDetails) {
          expect(product.name).toBeTruthy();
          expect(product.price).toMatch(/^\$\d+\.\d{2}$/); // Price format validation
          expect(product.description).toBeTruthy();
          
          console.log(`Product verified: ${product.name} - ${product.price}`);
        }
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Product catalog displayed correctly');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC010: Product Sorting - Name A to Z @regression', async ({ page }) => {
    const testName = 'TC010_Product_Sorting_Name_AZ';
    
    try {
      await test.step('Sort products by name A to Z', async () => {
        await inventoryPage.sortProducts(TestData.sortOptions.nameAZ.value);
      });
      
      await test.step('Verify products are sorted correctly', async () => {
        const actualOrder = await inventoryPage.getProductNames();
        const expectedOrder = TestData.expectedProductOrder.nameAZ;
        
        expect(TestUtils.arraysEqual(actualOrder, expectedOrder)).toBe(true);
        console.log('Products sorted A-Z correctly:', actualOrder);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Name A-Z sorting working correctly');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC011: Product Sorting - Name Z to A @regression', async ({ page }) => {
    const testName = 'TC011_Product_Sorting_Name_ZA';
    
    try {
      await test.step('Sort products by name Z to A', async () => {
        await inventoryPage.sortProducts(TestData.sortOptions.nameZA.value);
      });
      
      await test.step('Verify products are sorted correctly', async () => {
        const actualOrder = await inventoryPage.getProductNames();
        const expectedOrder = TestData.expectedProductOrder.nameZA;
        
        expect(TestUtils.arraysEqual(actualOrder, expectedOrder)).toBe(true);
        console.log('Products sorted Z-A correctly:', actualOrder);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Name Z-A sorting working correctly');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC012: Product Sorting - Price Low to High @regression', async ({ page }) => {
    const testName = 'TC012_Product_Sorting_Price_Low_High';
    
    try {
      await test.step('Sort products by price low to high', async () => {
        await inventoryPage.sortProducts(TestData.sortOptions.priceLowHigh.value);
      });
      
      await test.step('Verify products are sorted by price correctly', async () => {
        const actualOrder = await inventoryPage.getProductNames();
        const expectedOrder = TestData.expectedProductOrder.priceLowHigh;
        
        expect(TestUtils.arraysEqual(actualOrder, expectedOrder)).toBe(true);
        
        // Also verify prices are in ascending order
        const prices = await inventoryPage.getProductPrices();
        const numericPrices = prices.map(price => TestUtils.parseCurrency(price));
        
        for (let i = 1; i < numericPrices.length; i++) {
          expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i - 1]);
        }
        
        console.log('Products sorted by price (low to high) correctly');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Price low-high sorting working correctly');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC013: Product Sorting - Price High to Low @regression', async ({ page }) => {
    const testName = 'TC013_Product_Sorting_Price_High_Low';
    
    try {
      await test.step('Sort products by price high to low', async () => {
        await inventoryPage.sortProducts(TestData.sortOptions.priceHighLow.value);
      });
      
      await test.step('Verify products are sorted by price correctly', async () => {
        const actualOrder = await inventoryPage.getProductNames();
        const expectedOrder = TestData.expectedProductOrder.priceHighLow;
        
        expect(TestUtils.arraysEqual(actualOrder, expectedOrder)).toBe(true);
        
        // Also verify prices are in descending order
        const prices = await inventoryPage.getProductPrices();
        const numericPrices = prices.map(price => TestUtils.parseCurrency(price));
        
        for (let i = 1; i < numericPrices.length; i++) {
          expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i - 1]);
        }
        
        console.log('Products sorted by price (high to low) correctly');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Price high-low sorting working correctly');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC014: Add Single Product to Cart @smoke @regression', async ({ page }) => {
    const testName = 'TC014_Add_Single_Product_Cart';
    
    try {
      const productToAdd = TestData.products.backpack.name;
      
      await test.step('Add product to cart', async () => {
        await inventoryPage.addProductToCart(productToAdd);
      });
      
      await test.step('Verify cart badge shows item count', async () => {
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('1');
        console.log('Cart badge shows correct count: 1');
      });
      
      await test.step('Verify Add to Cart button changes to Remove', async () => {
        const buttonText = await inventoryPage.getAddToCartButtonText(productToAdd);
        expect(buttonText.toLowerCase()).toBe('remove');
        console.log('Button text changed to Remove');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Single product added to cart successfully');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC015: Add Multiple Products to Cart @regression', async ({ page }) => {
    const testName = 'TC015_Add_Multiple_Products_Cart';
    
    try {
      const productsToAdd = [
        TestData.products.backpack.name,
        TestData.products.bikeLight.name,
        TestData.products.boltTshirt.name
      ];
      
      await test.step('Add multiple products to cart', async () => {
        for (const product of productsToAdd) {
          await inventoryPage.addProductToCart(product);
        }
      });
      
      await test.step('Verify cart badge shows correct count', async () => {
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe(productsToAdd.length.toString());
        console.log(`Cart badge shows correct count: ${productsToAdd.length}`);
      });
      
      await test.step('Verify all Add to Cart buttons changed to Remove', async () => {
        for (const product of productsToAdd) {
          const buttonText = await inventoryPage.getAddToCartButtonText(product);
          expect(buttonText.toLowerCase()).toBe('remove');
        }
        console.log('All buttons changed to Remove');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Multiple products added to cart successfully');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC016: Remove Product from Cart via Inventory Page @regression', async ({ page }) => {
    const testName = 'TC016_Remove_Product_From_Cart';
    
    try {
      const productName = TestData.products.fleeceJacket.name;
      
      await test.step('Add product to cart first', async () => {
        await inventoryPage.addProductToCart(productName);
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('1');
      });
      
      await test.step('Remove product from cart', async () => {
        await inventoryPage.removeProductFromCart(productName);
      });
      
      await test.step('Verify cart badge is updated', async () => {
        const cartBadgeVisible = await inventoryPage.isCartBadgeVisible();
        expect(cartBadgeVisible).toBe(false);
        console.log('Cart badge hidden after removing all items');
      });
      
      await test.step('Verify Remove button changes back to Add to Cart', async () => {
        const buttonText = await inventoryPage.getAddToCartButtonText(productName);
        expect(buttonText.toLowerCase()).toBe('add to cart');
        console.log('Button text changed back to Add to Cart');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Product removed from cart successfully');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC017: Product Image Display @regression', async ({ page }) => {
    const testName = 'TC017_Product_Image_Display';
    
    try {
      await test.step('Verify all products have images', async () => {
        const productImages = await inventoryPage.getAllProductImages();

        expect(productImages.length).toBe(6);

        for (const image of productImages) {
          expect(image.src).toBeTruthy();
          expect(image.loaded).toBe(true);
          console.log(`Image verified: ${image.src}`);
        }
      });      await test.step('Verify images are loaded and visible', async () => {
        const allImagesLoaded = await inventoryPage.areAllImagesLoaded();
        expect(allImagesLoaded).toBe(true);
        console.log('All product images loaded successfully');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Product images displayed correctly');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });
});
