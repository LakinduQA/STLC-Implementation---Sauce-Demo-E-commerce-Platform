/**
 * End-to-End Tests - Complete User Journey
 * Sauce Demo STLC Project - IEEE YP 2025
 * Tests: Complete e-commerce workflows
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const TestData = require('../../utils/TestData');
const TestUtils = require('../../utils/TestUtils');

test.describe('End-to-End User Journey Tests', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test('E2E001: Complete Purchase Flow - Single Product @smoke @e2e', async ({ page }) => {
    const testName = 'E2E001_Complete_Purchase_Single_Product';
    const performanceMetrics = [];
    
    try {
      await test.step('User Authentication', async () => {
        const startTime = Date.now();
        
        await loginPage.navigateToLogin();
        await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
        await expect(page).toHaveURL(TestData.urls.inventory);
        
        const loginTime = Date.now() - startTime;
        performanceMetrics.push({ step: 'Login', time: loginTime });
        console.log(`⏱️ Login completed in ${loginTime}ms`);
      });
      
      await test.step('Product Discovery and Selection', async () => {
        const startTime = Date.now();
        
        // Verify product catalog is loaded
        await inventoryPage.verifyInventoryPageElements();
        const products = await inventoryPage.getProductNames();
        expect(products).toHaveLength(6);
        
        // Sort products by price (low to high) for better shopping experience
        await inventoryPage.sortProducts(TestData.sortOptions.priceLowHigh.value);
        
        // Select the cheapest product for the test
        const sortedProducts = await inventoryPage.getProductNames();
        const selectedProduct = sortedProducts[0]; // Should be Sauce Labs Onesie ($7.99)
        
        const discoveryTime = Date.now() - startTime;
        performanceMetrics.push({ step: 'Product Discovery', time: discoveryTime });
        console.log(`🔍 Product discovery completed in ${discoveryTime}ms - Selected: ${selectedProduct}`);
      });
      
      await test.step('Add Product to Cart', async () => {
        const startTime = Date.now();
        
        const productToAdd = TestData.products.onesie.name;
        await inventoryPage.addProductToCart(productToAdd);
        
        // Verify cart badge shows item count
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('1');
        
        const addToCartTime = Date.now() - startTime;
        performanceMetrics.push({ step: 'Add to Cart', time: addToCartTime });
        console.log(`🛒 Product added to cart in ${addToCartTime}ms`);
      });
      
      await test.step('Review Shopping Cart', async () => {
        const startTime = Date.now();
        
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(TestData.urls.cart);
        
        // Verify cart contents
        const cartItems = await cartPage.getCartItemNames();
        expect(cartItems).toHaveLength(1);
        expect(cartItems[0]).toBe(TestData.products.onesie.name);
        
        const cartDetails = await cartPage.getCartItemDetails();
        expect(cartDetails[0].price).toBe(TestData.products.onesie.price);
        
        const cartReviewTime = Date.now() - startTime;
        performanceMetrics.push({ step: 'Cart Review', time: cartReviewTime });
        console.log(`📋 Cart reviewed in ${cartReviewTime}ms`);
      });
      
      await test.step('Checkout Process - Customer Information', async () => {
        const startTime = Date.now();
        
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(TestData.urls.checkoutStepOne);
        
        const customerInfo = TestData.getCustomerInfo('valid');
        await checkoutPage.fillCustomerInformation(customerInfo);
        
        await checkoutPage.continueToStep2();
        await expect(page).toHaveURL(TestData.urls.checkoutStepTwo);
        
        const checkoutStep1Time = Date.now() - startTime;
        performanceMetrics.push({ step: 'Checkout Step 1', time: checkoutStep1Time });
        console.log(`📝 Customer information entered in ${checkoutStep1Time}ms`);
      });
      
      await test.step('Order Review and Confirmation', async () => {
        const startTime = Date.now();
        
        // Verify order summary
        const orderItems = await checkoutPage.getOrderSummaryItems();
        expect(orderItems).toHaveLength(1);
        expect(orderItems[0].name).toBe(TestData.products.onesie.name);
        
        // Verify price calculations
        const calculations = await checkoutPage.validateCheckoutCalculations();
        const expectedSubtotal = TestUtils.parseCurrency(TestData.products.onesie.price);
        expect(calculations.subtotal).toBe(expectedSubtotal);
        expect(calculations.tax).toBe(TestUtils.calculateTax(expectedSubtotal));
        expect(calculations.total).toBe(calculations.subtotal + calculations.tax);
        
        console.log(`💰 Order total: $${calculations.total.toFixed(2)} (Subtotal: $${calculations.subtotal}, Tax: $${calculations.tax.toFixed(2)})`);
        
        const orderReviewTime = Date.now() - startTime;
        performanceMetrics.push({ step: 'Order Review', time: orderReviewTime });
        console.log(`📊 Order reviewed in ${orderReviewTime}ms`);
      });
      
      await test.step('Complete Purchase', async () => {
        const startTime = Date.now();
        
        await checkoutPage.finishOrder();
        await expect(page).toHaveURL(TestData.urls.checkoutComplete);
        
        // Add wait for completion page elements before verification
        await page.waitForSelector('.complete-header', { timeout: 10000 });
        
        const confirmationMessage = await page.textContent('.complete-header');
        expect(confirmationMessage).toContain('THANK YOU FOR YOUR ORDER');
        
        const purchaseTime = Date.now() - startTime;
        performanceMetrics.push({ step: 'Complete Purchase', time: purchaseTime });
        console.log(`✅ Purchase completed in ${purchaseTime}ms`);
        console.log('🎉 E2E Purchase flow completed successfully');
      });
      
      // Log performance summary
      const totalTime = performanceMetrics.reduce((sum, metric) => sum + metric.time, 0);
      console.log('\n📈 Performance Summary:');
      performanceMetrics.forEach(metric => {
        console.log(`   ${metric.step}: ${metric.time}ms`);
      });
      console.log(`   Total E2E Time: ${totalTime}ms`);
      
      TestUtils.logTestExecution(testName, 'PASS', `Complete purchase flow successful in ${totalTime}ms`);
      
    } catch (error) {
      // Add browser context check before screenshot
      try {
        if (!page.isClosed()) {
          await TestUtils.saveScreenshot(page, testName);
        }
      } catch (screenshotError) {
        console.log('Could not save screenshot:', screenshotError.message);
      }
      
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('E2E002: Complete Purchase Flow - Multiple Products @e2e', async ({ page }) => {
    const testName = 'E2E002_Complete_Purchase_Multiple_Products';
    
    try {
      const productsToAdd = [
        TestData.products.backpack.name,
        TestData.products.bikeLight.name,
        TestData.products.boltTshirt.name
      ];
      
      await test.step('Login and Product Selection', async () => {
        await loginPage.navigateToLogin();
        await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
        
        // Add multiple products to cart
        for (const product of productsToAdd) {
          await inventoryPage.addProductToCart(product);
        }
        
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe(productsToAdd.length.toString());
      });
      
      await test.step('Cart Management', async () => {
        await inventoryPage.goToCart();
        
        // Verify all products are in cart
        const cartItems = await cartPage.getCartItemNames();
        expect(cartItems).toHaveLength(productsToAdd.length);
        
        for (const product of productsToAdd) {
          expect(cartItems).toContain(product);
        }
        
        // Remove one product to test cart management
        await cartPage.removeItemFromCart(TestData.products.boltTshirt.name);
        
        const updatedCartItems = await cartPage.getCartItemNames();
        expect(updatedCartItems).toHaveLength(2);
        expect(updatedCartItems).not.toContain(TestData.products.boltTshirt.name);
      });
      
      await test.step('Complete Checkout with Multiple Items', async () => {
        await cartPage.proceedToCheckout();
        
        const customerInfo = TestData.getCustomerInfo('international');
        await checkoutPage.fillCustomerInformation(customerInfo);
        
        await checkoutPage.continueToStep2();
        
        // Verify order summary for remaining 2 items
        const orderItems = await checkoutPage.getOrderSummaryItems();
        expect(orderItems).toHaveLength(2);
        
        // Calculate expected total
        const expectedPrices = [
          TestData.products.backpack.price,
          TestData.products.bikeLight.price
        ];
        
        const expectedSubtotal = expectedPrices.reduce((sum, price) => {
          return sum + TestUtils.parseCurrency(price);
        }, 0);
        
        const calculations = await checkoutPage.validateCheckoutCalculations();
        expect(calculations.subtotal).toBeCloseTo(expectedSubtotal, 2);
        
        await checkoutPage.finishOrder();
        await expect(page).toHaveURL(TestData.urls.checkoutComplete);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Multiple products purchase flow successful');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('E2E003: Shopping Experience with Problem User @e2e', async ({ page }) => {
    const testName = 'E2E003_Problem_User_Shopping_Experience';
    
    try {
      await test.step('Login with Problem User', async () => {
        await loginPage.navigateToLogin();
        await loginPage.login(TestData.users.problem.username, TestData.users.problem.password);
        await expect(page).toHaveURL(TestData.urls.inventory);
      });
      
      await test.step('Verify Problem User Behavior', async () => {
        // Problem user typically has issues with product images
        const products = await inventoryPage.getProductNames();
        expect(products).toHaveLength(6);
        
        // Try to complete a purchase despite potential issues
        await inventoryPage.addProductToCart(TestData.products.backpack.name);
        
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('1');
        
        console.log('⚠️ Problem user can still add products to cart');
      });
      
      await test.step('Attempt Complete Purchase with Problem User', async () => {
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();
        
        const customerInfo = TestData.getCustomerInfo('valid');
        await checkoutPage.fillCustomerInformation(customerInfo);
        
        await checkoutPage.continueToStep2();
        await checkoutPage.finishOrder();
        
        // Verify purchase can be completed despite being problem user
        await expect(page).toHaveURL(TestData.urls.checkoutComplete);
        console.log('✅ Problem user can complete purchases (issues are mainly visual)');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Problem user shopping experience documented');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('E2E004: Performance Testing with Performance Glitch User @e2e', async ({ page }) => {
    const testName = 'E2E004_Performance_Glitch_User_Experience';
    
    try {
      const performanceThresholds = {
        login: 5000,        // 5 seconds max for login
        pageLoad: 3000,     // 3 seconds max for page loads
        interaction: 2000   // 2 seconds max for interactions
      };
      
      await test.step('Performance Test - Login', async () => {
        const startTime = Date.now();
        
        await loginPage.navigateToLogin();
        await loginPage.login(TestData.users.performanceGlitch.username, TestData.users.performanceGlitch.password);
        await expect(page).toHaveURL(TestData.urls.inventory);
        
        const loginTime = Date.now() - startTime;
        console.log(`⏱️ Performance glitch user login time: ${loginTime}ms`);
        
        // Performance glitch user should be slower but still functional
        expect(loginTime).toBeGreaterThan(1000); // Should be noticeably slower
      });
      
      await test.step('Performance Test - Product Interactions', async () => {
        const startTime = Date.now();
        
        await inventoryPage.addProductToCart(TestData.products.backpack.name);
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('1');
        
        const interactionTime = Date.now() - startTime;
        console.log(`⏱️ Add to cart interaction time: ${interactionTime}ms`);
      });
      
      await test.step('Performance Test - Complete Purchase', async () => {
        const startTime = Date.now();
        
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();
        
        const customerInfo = TestData.getCustomerInfo('valid');
        await checkoutPage.fillCustomerInformation(customerInfo);
        
        await checkoutPage.continueToStep2();
        await checkoutPage.finishOrder();
        await expect(page).toHaveURL(TestData.urls.checkoutComplete);
        
        const checkoutTime = Date.now() - startTime;
        console.log(`⏱️ Complete checkout time: ${checkoutTime}ms`);
        
        // Verify purchase completed despite performance issues
        const confirmationMessage = await checkoutPage.getOrderConfirmationMessage();
        expect(confirmationMessage).toContain('THANK YOU FOR YOUR ORDER');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Performance glitch user experience documented');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('E2E005: Comprehensive Shopping Cart Management @e2e', async ({ page }) => {
    const testName = 'E2E005_Comprehensive_Cart_Management';
    
    try {
      await test.step('Setup - Login and Add Products', async () => {
        await loginPage.navigateToLogin();
        await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
        
        // Add all 6 products to cart
        const allProducts = Object.values(TestData.products).map(p => p.name);
        for (const product of allProducts) {
          await inventoryPage.addProductToCart(product);
        }
        
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('6');
      });
      
      await test.step('Cart Manipulation - Remove and Re-add', async () => {
        await inventoryPage.goToCart();
        
        // Remove 3 products
        const productsToRemove = [
          TestData.products.backpack.name,
          TestData.products.fleeceJacket.name,
          TestData.products.redTshirt.name
        ];
        
        for (const product of productsToRemove) {
          await cartPage.removeItemFromCart(product);
        }
        
        // Verify 3 products remain
        const remainingItems = await cartPage.getCartItemNames();
        expect(remainingItems).toHaveLength(3);
        
        // Go back and re-add one removed product
        await cartPage.continueShopping();
        await inventoryPage.addProductToCart(TestData.products.backpack.name);
        
        const updatedCartCount = await inventoryPage.getCartBadgeCount();
        expect(updatedCartCount).toBe('4');
      });
      
      await test.step('Complete Purchase with Final Cart', async () => {
        await inventoryPage.goToCart();
        
        const finalCartItems = await cartPage.getCartItemNames();
        expect(finalCartItems).toHaveLength(4);
        
        await cartPage.proceedToCheckout();
        
        const customerInfo = TestData.getCustomerInfo('minimal');
        await checkoutPage.fillCustomerInformation(customerInfo);
        
        await checkoutPage.continueToStep2();
        
        // Verify order summary shows 4 items
        const orderItems = await checkoutPage.getOrderSummaryItems();
        expect(orderItems).toHaveLength(4);
        
        await checkoutPage.finishOrder();
        await expect(page).toHaveURL(TestData.urls.checkoutComplete);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Comprehensive cart management successful');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });
});
