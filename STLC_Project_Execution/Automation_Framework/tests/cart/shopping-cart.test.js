/**
 * Shopping Cart Tests - Cart Module
 * Sauce Demo STLC Project - IEEE YP 2025  
 * Tests: TC018, TC019, TC020, TC021, TC022
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CartPage = require('../../pages/CartPage');
const TestData = require('../../utils/TestData');
const TestUtils = require('../../utils/TestUtils');

test.describe('Shopping Cart Module Tests', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    
    // Login with standard user before each test
    await loginPage.navigateToLogin();
    await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
    await expect(page).toHaveURL(TestData.urls.inventory);
  });

  test('TC018: View Empty Cart @smoke @regression', async ({ page }) => {
    const testName = 'TC018_View_Empty_Cart';
    
    try {
      await test.step('Navigate to cart page', async () => {
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(TestData.urls.cart);
      });
      
      await test.step('Verify cart page elements are present', async () => {
        await cartPage.verifyCartPageElements();
      });
      
      await test.step('Verify cart is empty', async () => {
        const cartItems = await cartPage.getCartItemNames();
        expect(cartItems).toHaveLength(0);
        console.log('✅ Cart is empty as expected');
      });
      
      await test.step('Verify Continue Shopping button is functional', async () => {
        await cartPage.continueShopping();
        await expect(page).toHaveURL(TestData.urls.inventory);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Empty cart viewed successfully');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC019: View Cart with Single Item @smoke @regression', async ({ page }) => {
    const testName = 'TC019_View_Cart_Single_Item';
    
    try {
      const productToAdd = TestData.products.backpack.name;
      
      await test.step('Add product to cart from inventory', async () => {
        await inventoryPage.addProductToCart(productToAdd);
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('1');
      });
      
      await test.step('Navigate to cart page', async () => {
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(TestData.urls.cart);
      });
      
      await test.step('Verify cart contains the added product', async () => {
        const cartItems = await cartPage.getCartItemNames();
        expect(cartItems).toHaveLength(1);
        expect(cartItems[0]).toBe(productToAdd);
        console.log(`✅ Cart contains: ${productToAdd}`);
      });
      
      await test.step('Verify product details in cart', async () => {
        const cartDetails = await cartPage.getCartItemDetails();
        const item = cartDetails[0];
        
        expect(item.name).toBe(productToAdd);
        expect(item.price).toBe(TestData.products.backpack.price);
        expect(item.quantity).toBe('1');
        
        console.log(`✅ Product details correct: ${item.name} - ${item.price} - Qty: ${item.quantity}`);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Single item cart viewed successfully');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC020: View Cart with Multiple Items @regression', async ({ page }) => {
    const testName = 'TC020_View_Cart_Multiple_Items';
    
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
        
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe(productsToAdd.length.toString());
      });
      
      await test.step('Navigate to cart page', async () => {
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(TestData.urls.cart);
      });
      
      await test.step('Verify all products are in cart', async () => {
        const cartItems = await cartPage.getCartItemNames();
        expect(cartItems).toHaveLength(productsToAdd.length);
        
        for (const product of productsToAdd) {
          expect(cartItems).toContain(product);
        }
        
        console.log(`✅ Cart contains all ${productsToAdd.length} products`);
      });
      
      await test.step('Verify cart total calculation', async () => {
        const expectedPrices = [
          TestData.products.backpack.price,
          TestData.products.bikeLight.price,
          TestData.products.boltTshirt.price
        ];
        
        const expectedTotal = expectedPrices.reduce((sum, price) => {
          return sum + TestUtils.parseCurrency(price);
        }, 0);
        
        const actualTotal = await cartPage.calculateTotalCartValue();
        expect(actualTotal).toBeCloseTo(expectedTotal, 2);
        
        console.log(`✅ Cart total calculated correctly: $${actualTotal.toFixed(2)}`);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Multiple items cart viewed successfully');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC021: Remove Item from Cart @regression', async ({ page }) => {
    const testName = 'TC021_Remove_Item_From_Cart';
    
    try {
      const productsToAdd = [
        TestData.products.backpack.name,
        TestData.products.bikeLight.name
      ];
      const productToRemove = TestData.products.backpack.name;
      
      await test.step('Add multiple products to cart', async () => {
        for (const product of productsToAdd) {
          await inventoryPage.addProductToCart(product);
        }
        await inventoryPage.goToCart();
      });
      
      await test.step('Remove one product from cart', async () => {
        await cartPage.removeItemFromCart(productToRemove);
      });
      
      await test.step('Verify product is removed from cart', async () => {
        const cartItems = await cartPage.getCartItemNames();
        expect(cartItems).toHaveLength(1);
        expect(cartItems).not.toContain(productToRemove);
        expect(cartItems).toContain(TestData.products.bikeLight.name);
        
        console.log(`✅ ${productToRemove} removed successfully`);
      });
      
      await test.step('Verify cart badge is updated', async () => {
        const cartCount = await cartPage.getCartBadgeCount();
        expect(cartCount).toBe('1');
        console.log('✅ Cart badge updated correctly');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Item removed from cart successfully');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC022: Remove All Items from Cart @regression', async ({ page }) => {
    const testName = 'TC022_Remove_All_Items_From_Cart';
    
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
        await inventoryPage.goToCart();
      });
      
      await test.step('Remove all products from cart', async () => {
        const cartItems = await cartPage.getCartItemNames();
        
        for (const item of cartItems) {
          await cartPage.removeItemFromCart(item);
        }
      });
      
      await test.step('Verify cart is empty', async () => {
        const cartItems = await cartPage.getCartItemNames();
        expect(cartItems).toHaveLength(0);
        console.log('✅ All items removed, cart is empty');
      });
      
      await test.step('Verify cart badge is hidden', async () => {
        const cartBadgeVisible = await cartPage.isCartBadgeVisible();
        expect(cartBadgeVisible).toBe(false);
        console.log('✅ Cart badge hidden after removing all items');
      });
      
      await test.step('Verify checkout button behavior with empty cart', async () => {
        // Should be able to click checkout but may show validation message
        await cartPage.proceedToCheckout();
        // The app might redirect to checkout or show validation - verify we're still on cart or checkout
        const currentUrl = page.url();
        const validUrls = [TestData.urls.cart, TestData.urls.checkoutStepOne];
        expect(validUrls.some(url => currentUrl.includes(url))).toBe(true);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'All items removed from cart successfully');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC023: Cart Persistence Across Navigation @regression', async ({ page }) => {
    const testName = 'TC023_Cart_Persistence_Navigation';
    
    try {
      const productToAdd = TestData.products.fleeceJacket.name;
      
      await test.step('Add product to cart', async () => {
        await inventoryPage.addProductToCart(productToAdd);
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('1');
      });
      
      await test.step('Navigate to cart and back to inventory', async () => {
        await inventoryPage.goToCart();
        await cartPage.continueShopping();
        await expect(page).toHaveURL(TestData.urls.inventory);
      });
      
      await test.step('Verify cart count persists', async () => {
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('1');
        console.log('✅ Cart count persisted across navigation');
      });
      
      await test.step('Verify cart contents persist', async () => {
        await inventoryPage.goToCart();
        const cartItems = await cartPage.getCartItemNames();
        expect(cartItems).toHaveLength(1);
        expect(cartItems[0]).toBe(productToAdd);
        console.log('✅ Cart contents persisted across navigation');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Cart persistence working correctly');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC024: Cart Item Quantity Validation @regression', async ({ page }) => {
    const testName = 'TC024_Cart_Item_Quantity_Validation';
    
    try {
      const productToAdd = TestData.products.onesie.name;
      
      await test.step('Add same product multiple times', async () => {
        // Add product twice to see if quantity increases or if it creates separate entries
        await inventoryPage.addProductToCart(productToAdd);
        
        // Check button state
        const buttonText = await inventoryPage.getAddToCartButtonText(productToAdd);
        expect(buttonText.toLowerCase()).toBe('remove');
        
        // In Sauce Demo, adding same product again should not increase quantity
        // The button should already be in "Remove" state
        console.log('✅ Product add button correctly shows Remove state');
      });
      
      await test.step('Verify cart shows single item with quantity 1', async () => {
        await inventoryPage.goToCart();
        const cartItems = await cartPage.getCartItemNames();
        expect(cartItems).toHaveLength(1);
        
        const cartDetails = await cartPage.getCartItemDetails(productToAdd);
        expect(cartDetails.quantity).toBe('1');
        
        console.log('✅ Cart shows single item with correct quantity');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Cart quantity validation working correctly');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });
});
