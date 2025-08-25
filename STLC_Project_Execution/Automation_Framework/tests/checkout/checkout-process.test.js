/**
 * Checkout Process Tests - Checkout Module
 * Sauce Demo STLC Project - IEEE YP 2025
 * Tests: TC025, TC026, TC027, TC028, TC029, TC030
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const TestData = require('../../utils/TestData');
const TestUtils = require('../../utils/TestUtils');

test.describe('Checkout Process Module Tests', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    // Login and add a product to cart before each test
    await loginPage.navigateToLogin();
    await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
    await inventoryPage.addProductToCart(TestData.products.backpack.name);
    await inventoryPage.goToCart();
  });

  test('TC025: Checkout Step 1 - Valid Information @smoke @regression', async ({ page }) => {
    const testName = 'TC025_Checkout_Step1_Valid_Info';
    
    try {
      await test.step('Proceed to checkout step 1', async () => {
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(TestData.urls.checkoutStepOne);
      });
      
      await test.step('Verify checkout step 1 page elements', async () => {
        await checkoutPage.verifyCheckoutStep1Elements();
      });
      
      await test.step('Fill customer information with valid data', async () => {
        const customerInfo = TestData.getCustomerInfo('valid');
        await checkoutPage.fillCustomerInformation(customerInfo);
      });
      
      await test.step('Continue to checkout step 2', async () => {
        await checkoutPage.continueToStep2();
        await expect(page).toHaveURL(TestData.urls.checkoutStepTwo);
        console.log('✅ Successfully proceeded to checkout step 2');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Checkout step 1 completed with valid information');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC026: Checkout Step 1 - Empty First Name Validation @regression', async ({ page }) => {
    const testName = 'TC026_Checkout_Step1_Empty_FirstName';
    
    try {
      await test.step('Proceed to checkout step 1', async () => {
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(TestData.urls.checkoutStepOne);
      });
      
      await test.step('Submit form with empty first name', async () => {
        await checkoutPage.fillCustomerInformation({ firstName: '', lastName: 'Doe', postalCode: '12345' });
        await checkoutPage.continueToStep2();
      });
      
      await test.step('Verify validation error for empty first name', async () => {
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toBe(TestData.errorMessages.emptyFirstName);
        console.log('✅ Empty first name validation working correctly');
      });
      
      await test.step('Verify user remains on step 1', async () => {
        await expect(page).toHaveURL(TestData.urls.checkoutStepOne);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Empty first name validation working correctly');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC027: Checkout Step 1 - Empty Last Name Validation @regression', async ({ page }) => {
    const testName = 'TC027_Checkout_Step1_Empty_LastName';
    
    try {
      await test.step('Proceed to checkout step 1', async () => {
        await cartPage.proceedToCheckout();
      });
      
      await test.step('Submit form with empty last name', async () => {
        await checkoutPage.fillCustomerInformation({ firstName: 'John', lastName: '', postalCode: '12345' });
        await checkoutPage.continueToStep2();
      });
      
      await test.step('Verify validation error for empty last name', async () => {
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toBe(TestData.errorMessages.emptyLastName);
        console.log('✅ Empty last name validation working correctly');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Empty last name validation working correctly');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC028: Checkout Step 1 - Empty Postal Code Validation @regression', async ({ page }) => {
    const testName = 'TC028_Checkout_Step1_Empty_PostalCode';
    
    try {
      await test.step('Proceed to checkout step 1', async () => {
        await cartPage.proceedToCheckout();
      });
      
      await test.step('Submit form with empty postal code', async () => {
        await checkoutPage.fillCustomerInformation({ firstName: 'John', lastName: 'Doe', postalCode: '' });
        await checkoutPage.continueToStep2();
      });
      
      await test.step('Verify validation error for empty postal code', async () => {
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toBe(TestData.errorMessages.emptyPostalCode);
        console.log('✅ Empty postal code validation working correctly');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Empty postal code validation working correctly');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC029: Checkout Step 2 - Order Summary Verification @smoke @regression', async ({ page }) => {
    const testName = 'TC029_Checkout_Step2_Order_Summary';
    
    try {
      const customerInfo = TestData.getCustomerInfo('valid');
      
      await test.step('Complete checkout step 1', async () => {
        await cartPage.proceedToCheckout();
        await checkoutPage.fillCustomerInformation(customerInfo);
        await checkoutPage.continueToStep2();
        await expect(page).toHaveURL(TestData.urls.checkoutStepTwo);
      });
      
      await test.step('Verify checkout step 2 page elements', async () => {
        await checkoutPage.verifyCheckoutStep2Elements();
      });
      
      await test.step('Verify order summary contains correct items', async () => {
        const orderItems = await checkoutPage.getOrderSummaryItems();
        expect(orderItems).toHaveLength(1);
        expect(orderItems[0].name).toBe(TestData.products.backpack.name);
        expect(orderItems[0].price).toBe(TestData.products.backpack.price);
        console.log('✅ Order summary shows correct items');
      });
      
      await test.step('Verify price calculations', async () => {
        const calculations = await checkoutPage.validateCheckoutCalculations();
        
        expect(calculations.subtotal).toBe(TestUtils.parseCurrency(TestData.products.backpack.price));
        expect(calculations.tax).toBeGreaterThan(0);
        expect(calculations.tax).toBe(TestUtils.calculateTax(calculations.subtotal));
        expect(calculations.total).toBe(calculations.subtotal + calculations.tax);
        
        console.log(`✅ Price calculations correct: Subtotal: $${calculations.subtotal}, Tax: $${calculations.tax}, Total: $${calculations.total}`);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Checkout step 2 order summary verified');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC030: Complete Checkout Process @smoke @regression', async ({ page }) => {
    const testName = 'TC030_Complete_Checkout_Process';
    
    try {
      const customerInfo = TestData.getCustomerInfo('valid');
      
      await test.step('Complete checkout steps 1 and 2', async () => {
        await cartPage.proceedToCheckout();
        await checkoutPage.fillCustomerInformation(customerInfo);
        await checkoutPage.continueToStep2();
      });
      
      await test.step('Complete the order', async () => {
        await checkoutPage.finishOrder();
        await expect(page).toHaveURL(TestData.urls.checkoutComplete);
        console.log('✅ Order completed successfully');
      });
      
      await test.step('Verify order completion page', async () => {
        // Add wait for elements before verification
        await page.waitForSelector('.complete-header', { timeout: 10000 });
        
        const confirmationMessage = await page.textContent('.complete-header');
        expect(confirmationMessage).toContain('THANK YOU');
        console.log('✅ Order confirmation page displayed correctly');
        console.log('✅ Complete checkout process successful');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Complete checkout process successful');
      
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

  test('TC031: Checkout with Multiple Items @regression', async ({ page }) => {
    const testName = 'TC031_Checkout_Multiple_Items';
    
    try {
      const additionalProducts = [
        TestData.products.bikeLight.name,
        TestData.products.boltTshirt.name
      ];
      
      await test.step('Add additional products to cart', async () => {
        await cartPage.continueShopping();
        
        for (const product of additionalProducts) {
          await inventoryPage.addProductToCart(product);
        }
        
        await inventoryPage.goToCart();
        
        // Verify we have 3 items total
        const cartItems = await cartPage.getCartItemNames();
        expect(cartItems).toHaveLength(3);
      });
      
      await test.step('Complete checkout process', async () => {
        const customerInfo = TestData.getCustomerInfo('valid');
        
        await cartPage.proceedToCheckout();
        await checkoutPage.fillCustomerInformation(customerInfo);
        await checkoutPage.continueToStep2();
      });
      
      await test.step('Verify order summary for multiple items', async () => {
        const orderItems = await checkoutPage.getOrderSummaryItems();
        expect(orderItems).toHaveLength(3);
        
        const expectedTotal = [
          TestData.products.backpack.price,
          TestData.products.bikeLight.price,
          TestData.products.boltTshirt.price
        ].reduce((sum, price) => sum + TestUtils.parseCurrency(price), 0);
        
        const calculations = await checkoutPage.validateCheckoutCalculations();
        expect(calculations.subtotal).toBeCloseTo(expectedTotal, 2);
        
        console.log(`✅ Multiple items checkout - Subtotal: $${calculations.subtotal}`);
      });
      
      await test.step('Complete the order', async () => {
        await checkoutPage.finishOrder();
        await expect(page).toHaveURL(TestData.urls.checkoutComplete);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Multiple items checkout completed successfully');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC032: Checkout Cancel Functionality @regression', async ({ page }) => {
    const testName = 'TC032_Checkout_Cancel_Functionality';
    
    try {
      await test.step('Start checkout process', async () => {
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(TestData.urls.checkoutStepOne);
      });
      
      await test.step('Cancel checkout from step 1', async () => {
        await checkoutPage.cancelCheckout();
        await expect(page).toHaveURL(TestData.urls.cart);
        console.log('✅ Successfully cancelled checkout from step 1');
      });
      
      await test.step('Verify cart contents are preserved', async () => {
        // Wait for cart items to load
        await page.waitForSelector('.cart_item', { timeout: 5000 });
        
        const cartItems = await cartPage.getCartItemNames();
        expect(cartItems).toHaveLength(1);
        expect(cartItems[0]).toBe(TestData.products.backpack.name);
        console.log('✅ Cart contents preserved after cancellation');
      });
      
      await test.step('Test cancel from step 2', async () => {
        const customerInfo = TestData.getCustomerInfo('valid');
        
        await cartPage.proceedToCheckout();
        await checkoutPage.fillCustomerInformation(customerInfo);
        await checkoutPage.continueToStep2();
        await checkoutPage.cancelCheckout();
        
        // Cancel from step 2 goes to inventory page (based on manual testing)
        await expect(page).toHaveURL(TestData.urls.inventory);
        console.log('✅ Successfully cancelled checkout from step 2');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Checkout cancel functionality working correctly');
      
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
});
