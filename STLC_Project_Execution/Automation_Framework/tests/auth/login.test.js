/**
 * Authentication Tests - Login Module
 * Sauce Demo STLC Project - IEEE YP 2025
 * Tests: TC001, TC002, TC003, TC004, TC005, TC006
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const TestData = require('../../utils/TestData');
const TestUtils = require('../../utils/TestUtils');

test.describe('Authentication Module Tests', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigateToLogin();
  });

  test('TC001: Valid Login with Standard User @smoke @regression', async ({ page }) => {
    const testName = 'TC001_Valid_Login_Standard_User';
    
    try {
      // Test Data
      const user = TestData.users.standard;
      
      // Test Steps
      await test.step('Verify login page elements are displayed', async () => {
        await loginPage.verifyLoginPageElements();
      });
      
      await test.step('Enter valid credentials and login', async () => {
        await loginPage.login(user.username, user.password);
      });
      
      await test.step('Verify successful login and redirection to inventory page', async () => {
        await expect(page).toHaveURL(TestData.urls.inventory);
        await inventoryPage.verifyInventoryPageElements();
      });
      
      await test.step('Verify user can see product catalog', async () => {
        const products = await inventoryPage.getProductNames();
        expect(products.length).toBeGreaterThan(0);
        console.log(`✅ Found ${products.length} products in catalog`);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Standard user login successful');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC002: Invalid Login - Wrong Password @regression', async ({ page }) => {
    const testName = 'TC002_Invalid_Login_Wrong_Password';
    
    try {
      // Test Data
      const user = TestData.users.invalid;
      
      // Test Steps
      await test.step('Enter invalid credentials', async () => {
        await loginPage.login(user.username, user.password);
      });
      
      await test.step('Verify error message is displayed', async () => {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe(TestData.errorMessages.invalidCredentials);
        console.log('✅ Correct error message displayed for invalid credentials');
      });
      
      await test.step('Verify user remains on login page', async () => {
        await expect(page).toHaveURL(TestData.urls.login);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Invalid login properly rejected');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC003: Locked Out User Login @regression', async ({ page }) => {
    const testName = 'TC003_Locked_Out_User_Login';
    
    try {
      // Test Data
      const user = TestData.users.lockedOut;
      
      // Test Steps
      await test.step('Attempt login with locked out user', async () => {
        await loginPage.login(user.username, user.password);
      });
      
      await test.step('Verify locked out error message', async () => {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe(TestData.errorMessages.lockedOut);
        console.log('✅ Locked out user properly blocked');
      });
      
      await test.step('Verify user cannot access inventory', async () => {
        await expect(page).toHaveURL(TestData.urls.login);
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Locked out user correctly handled');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC004: Empty Username Validation @regression', async ({ page }) => {
    const testName = 'TC004_Empty_Username_Validation';
    
    try {
      // Test Steps
      await test.step('Attempt login with empty username', async () => {
        await loginPage.login('', 'secret_sauce');
      });
      
      await test.step('Verify username required error message', async () => {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe(TestData.errorMessages.emptyUsername);
        console.log('✅ Empty username validation working correctly');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Empty username validation successful');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC005: Empty Password Validation @regression', async ({ page }) => {
    const testName = 'TC005_Empty_Password_Validation';
    
    try {
      // Test Steps
      await test.step('Attempt login with empty password', async () => {
        await loginPage.login('standard_user', '');
      });
      
      await test.step('Verify password required error message', async () => {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe(TestData.errorMessages.emptyPassword);
        console.log('✅ Empty password validation working correctly');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Empty password validation successful');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC006: Login with Problem User @regression', async ({ page }) => {
    const testName = 'TC006_Problem_User_Login';
    
    try {
      // Test Data
      const user = TestData.users.problem;
      
      // Test Steps
      await test.step('Login with problem user credentials', async () => {
        await loginPage.login(user.username, user.password);
      });
      
      await test.step('Verify login succeeds despite being problem user', async () => {
        await expect(page).toHaveURL(TestData.urls.inventory);
        console.log('✅ Problem user can login (issues may appear in other functionality)');
      });
      
      await test.step('Verify inventory page loads', async () => {
        await inventoryPage.verifyInventoryPageElements();
      });
      
      // Note: Problem user issues typically manifest in product images, not login
      TestUtils.logTestExecution(testName, 'PASS', 'Problem user login successful');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC007: Performance Glitch User Login @regression', async ({ page }) => {
    const testName = 'TC007_Performance_Glitch_User_Login';
    
    try {
      // Test Data
      const user = TestData.users.performanceGlitch;
      
      // Record start time
      const startTime = Date.now();
      
      // Test Steps
      await test.step('Login with performance glitch user', async () => {
        await loginPage.login(user.username, user.password);
      });
      
      await test.step('Measure login performance', async () => {
        const endTime = Date.now();
        const loginTime = endTime - startTime;
        
        console.log(`⏱️  Login time for performance glitch user: ${loginTime}ms`);
        
        // Performance glitch user should take noticeably longer
        expect(loginTime).toBeGreaterThan(1000); // Should take more than 1 second
      });
      
      await test.step('Verify successful login despite performance issues', async () => {
        await expect(page).toHaveURL(TestData.urls.inventory);
        await inventoryPage.verifyInventoryPageElements();
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Performance glitch user login completed');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });

  test('TC008: Error Message Clear Functionality @regression', async ({ page }) => {
    const testName = 'TC008_Error_Message_Clear';
    
    try {
      // Test Steps
      await test.step('Generate an error message', async () => {
        await loginPage.login('', '');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBeTruthy();
      });
      
      await test.step('Clear error message by clicking X button', async () => {
        await loginPage.clearErrorMessage();
      });
      
      await test.step('Verify error message is cleared', async () => {
        const isErrorVisible = await loginPage.isErrorMessageVisible();
        expect(isErrorVisible).toBe(false);
        console.log('✅ Error message cleared successfully');
      });
      
      TestUtils.logTestExecution(testName, 'PASS', 'Error message clear functionality working');
      
    } catch (error) {
      await TestUtils.saveScreenshot(page, testName);
      TestUtils.logTestExecution(testName, 'FAIL', error.message);
      throw error;
    }
  });
});
