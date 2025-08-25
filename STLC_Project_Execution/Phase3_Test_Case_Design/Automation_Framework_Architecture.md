# IEEE YP 2025 STLC PROJECT - AUTOMATION FRAMEWORK ARCHITECTURE

**Project:** Software Testing Life Cycle Implementation - Sauce Demo E-commerce Platform  
**Phase:** Phase 3 - Test Case Design & Automation Framework  
**Version:** 2.0 (Final Implementation)

## 1. FRAMEWORK OVERVIEW

### 1.1 Framework Selection: Playwright with JavaScript

**Rationale for Playwright:**

- **Modern Browser Automation:** Fast, reliable, and supports all major browsers
- **Built-in Wait Strategies:** Automatic waiting for elements and network requests
- **Rich API:** Comprehensive set of actions and assertions
- **Cross-browser Support:** Chrome, Firefox, Safari, Edge without additional drivers
- **Headless/Headed Modes:** Flexible execution options for debugging and CI/CD
- **Screenshot/Video Capture:** Built-in failure documentation
- **Network Interception:** Advanced testing capabilities for API validation

**JavaScript Implementation Benefits:**

- **Rapid Development:** Quick implementation and prototyping
- **Native Node.js Support:** Seamless integration with Playwright
- **Simplified Deployment:** No compilation step required
- **Easy Debugging:** Direct browser debugging capabilities
- **Community Support:** Extensive JavaScript testing ecosystem

### 1.2 Framework Architecture Pattern: Page Object Model (POM)

**Benefits of POM:**

- **Code Reusability:** Common page interactions shared across tests
- **Maintainability:** Centralized element management and page logic
- **Readability:** Clear separation between test logic and page implementation
- **Scalability:** Easy addition of new pages and test scenarios

### 1.3 Framework Design Objectives

- **Implement 37 automated test scripts** covering complete e-commerce functionality
- **Provide robust test execution** capability across multiple environments
- **Generate comprehensive reports** with screenshots and detailed logging capability
- **Support cross-browser testing** with Chrome, Firefox, Edge, Safari
- **Enable easy maintenance** and extension of test coverage

## 2. FRAMEWORK STRUCTURE

### 2.1 Directory Organization

```
Automation_Framework/
├── tests/
│   ├── auth/
│   │   └── login.test.js
│   ├── inventory/
│   │   └── products.test.js
│   ├── cart/
│   │   └── shopping-cart.test.js
│   ├── checkout/
│   │   └── checkout-process.test.js
│   └── e2e/
│       └── user-journey.test.js
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── utils/
│   ├── TestData.js
│   └── TestUtils.js
├── config/
│   ├── global-setup.js
│   └── global-teardown.js
├── logs/
├── screenshots/
├── playwright-report/
├── test-results/
├── playwright.config.js
├── package.json
├── package-lock.json
└── debug_checkout.js
```

### 2.2 Core Components Architecture

#### 2.2.1 Page Object Classes

- **BasePage.js:** Common page functionality and utilities
- **LoginPage.js:** Authentication page interactions
- **InventoryPage.js:** Product catalog operations
- **CartPage.js:** Shopping cart management
- **CheckoutPage.js:** Multi-step checkout process

#### 2.2.2 Test Implementation Files

- **Authentication Tests:** 8 tests covering login/logout scenarios
- **Inventory Tests:** 9 tests covering product catalog functionality
- **Cart Tests:** 7 tests covering shopping cart operations
- **Checkout Tests:** 8 tests covering complete checkout process
- **E2E Tests:** 5 tests covering end-to-end user journeys

#### 2.2.3 Utility Classes

- **TestData.js:** Centralized test data management
- **TestUtils.js:** Common helper functions and utilities

## 3. PAGE OBJECT MODEL DESIGN

### 3.1 BasePage Class Structure

```javascript
class BasePage {
  constructor(page) {
    this.page = page;
    this.timeout = 30000;
  }

  // Common navigation methods
  async navigateTo(url) {
    await this.page.goto(url);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  // Common element interactions
  async clickElement(selector) {
    await this.page.click(selector);
  }

  async typeText(selector, text) {
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isElementVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async waitForElement(selector) {
    await this.page.waitForSelector(selector);
  }
}

module.exports = BasePage;
```

### 3.2 LoginPage Class Design

```javascript
const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Page Elements
    this.usernameField = '[data-test="username"]';
    this.passwordField = '[data-test="password"]';
    this.loginButton = '[data-test="login-button"]';
    this.errorMessage = '[data-test="error"]';
  }

  // Page Actions
  async navigateToLogin() {
    await this.navigateTo("https://www.saucedemo.com/v1/");
  }

  async enterUsername(username) {
    await this.typeText(this.usernameField, username);
  }

  async enterPassword(password) {
    await this.typeText(this.passwordField, password);
  }

  async clickLoginButton() {
    await this.clickElement(this.loginButton);
  }

  async performLogin(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  // Page Validations
  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async isErrorDisplayed() {
    return await this.isElementVisible(this.errorMessage);
  }
}

module.exports = LoginPage;
```

### 3.3 InventoryPage Class Design

```javascript
const BasePage = require("./BasePage");

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    // Page Elements
    this.inventoryContainer = ".inventory_list";
    this.productItems = ".inventory_item";
    this.sortDropdown = ".product_sort_container";
    this.addToCartButtons = '[data-test*="add-to-cart"]';
    this.cartIcon = ".shopping_cart_link";
    this.cartBadge = ".shopping_cart_badge";
  }

  // Page Actions
  async getAllProducts() {
    return await this.page.$$eval(this.productItems, (elements) =>
      elements.map((el) => ({
        name: el.querySelector(".inventory_item_name").textContent,
        price: el.querySelector(".inventory_item_price").textContent,
        description: el.querySelector(".inventory_item_desc").textContent,
      }))
    );
  }

  async addProductToCart(productName) {
    const selector = `[data-test="add-to-cart-${productName
      .toLowerCase()
      .replace(/\s+/g, "-")}"]`;
    await this.clickElement(selector);
  }

  async sortProducts(sortOption) {
    await this.page.selectOption(this.sortDropdown, sortOption);
  }

  async navigateToCart() {
    await this.clickElement(this.cartIcon);
  }

  // Page Validations
  async getProductCount() {
    return await this.page.$$eval(
      this.productItems,
      (elements) => elements.length
    );
  }

  async getCartItemCount() {
    const badgeText = await this.getText(this.cartBadge);
    return badgeText ? parseInt(badgeText) : 0;
  }
}

module.exports = InventoryPage;
```

## 4. TEST DATA MANAGEMENT

### 4.1 TestData Class Structure

```javascript
class TestData {
  static VALID_USERS = {
    STANDARD_USER: { username: "standard_user", password: "secret_sauce" },
    PROBLEM_USER: { username: "problem_user", password: "secret_sauce" },
    PERFORMANCE_GLITCH_USER: {
      username: "performance_glitch_user",
      password: "secret_sauce",
    },
    VISUAL_USER: { username: "visual_user", password: "secret_sauce" },
  };

  static INVALID_USERS = {
    LOCKED_OUT_USER: { username: "locked_out_user", password: "secret_sauce" },
    INVALID_USER: { username: "invalid_user", password: "secret_sauce" },
    WRONG_PASSWORD: { username: "standard_user", password: "wrong_password" },
  };

  static PRODUCTS = {
    BACKPACK: {
      name: "Sauce Labs Backpack",
      price: "$29.99",
      id: "sauce-labs-backpack",
    },
    BIKE_LIGHT: {
      name: "Sauce Labs Bike Light",
      price: "$9.99",
      id: "sauce-labs-bike-light",
    },
    BOLT_SHIRT: {
      name: "Sauce Labs Bolt T-Shirt",
      price: "$15.99",
      id: "sauce-labs-bolt-t-shirt",
    },
    FLEECE_JACKET: {
      name: "Sauce Labs Fleece Jacket",
      price: "$49.99",
      id: "sauce-labs-fleece-jacket",
    },
    ONESIE: {
      name: "Sauce Labs Onesie",
      price: "$7.99",
      id: "sauce-labs-onesie",
    },
    RED_SHIRT: {
      name: "Test.allTheThings() T-Shirt (Red)",
      price: "$15.99",
      id: "test.allthethings()-t-shirt-(red)",
    },
  };

  static CUSTOMERS = {
    PRIMARY: { firstName: "John", lastName: "Smith", postalCode: "12345" },
    ALTERNATIVE: { firstName: "Jane", lastName: "Doe", postalCode: "67890" },
  };

  static EXPECTED_RESULTS = {
    TAX_RATE: 0.08,
    PAYMENT_INFO: "SauceCard #31337",
    SHIPPING_INFO: "FREE PONY EXPRESS DELIVERY!",
    CONFIRMATION_MESSAGE: "THANK YOU FOR YOUR ORDER",
  };
}

module.exports = TestData;
```

### 4.2 TestUtils Helper Functions

```javascript
class TestUtils {
  static async calculateExpectedTotal(items) {
    const subtotal = items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return sum + price;
    }, 0);

    const tax = subtotal * TestData.EXPECTED_RESULTS.TAX_RATE;
    const total = subtotal + tax;

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    };
  }

  static async waitForElementAndClick(page, selector, timeout = 30000) {
    await page.waitForSelector(selector, { timeout });
    await page.click(selector);
  }

  static async getRandomProduct() {
    const products = Object.values(TestData.PRODUCTS);
    return products[Math.floor(Math.random() * products.length)];
  }

  static async takeScreenshotOnFailure(page, testName) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    await page.screenshot({
      path: `screenshots/failure-${testName}-${timestamp}.png`,
      fullPage: true,
    });
  }
}

module.exports = TestUtils;
```

## 5. AUTOMATION SCRIPT IMPLEMENTATION

### 5.1 Authentication Test Scripts (8 Tests)

```javascript
const { test, expect } = require("@playwright/test");
const LoginPage = require("../../pages/LoginPage");
const InventoryPage = require("../../pages/InventoryPage");
const TestData = require("../../utils/TestData");

test.describe("Authentication Tests", () => {
  test("TC001: Valid Login with Standard User", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigateToLogin();
    await loginPage.performLogin(
      TestData.VALID_USERS.STANDARD_USER.username,
      TestData.VALID_USERS.STANDARD_USER.password
    );

    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(inventoryPage.inventoryContainer).toBeVisible();
  });

  test("TC002: Valid Login with Problem User", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();
    await loginPage.performLogin(
      TestData.VALID_USERS.PROBLEM_USER.username,
      TestData.VALID_USERS.PROBLEM_USER.password
    );

    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test("TC003: Invalid Login - Wrong Username", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();
    await loginPage.performLogin(
      TestData.INVALID_USERS.INVALID_USER.username,
      TestData.INVALID_USERS.INVALID_USER.password
    );

    expect(await loginPage.isErrorDisplayed()).toBe(true);
    await expect(page).toHaveURL(/.*index.html/);
  });

  test("TC004: Invalid Login - Wrong Password", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();
    await loginPage.performLogin(
      TestData.INVALID_USERS.WRONG_PASSWORD.username,
      TestData.INVALID_USERS.WRONG_PASSWORD.password
    );

    expect(await loginPage.isErrorDisplayed()).toBe(true);
  });

  test("TC005: Locked User Account Handling", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();
    await loginPage.performLogin(
      TestData.INVALID_USERS.LOCKED_OUT_USER.username,
      TestData.INVALID_USERS.LOCKED_OUT_USER.password
    );

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain("locked out");
  });
});
```

### 5.2 Product Catalog Test Scripts (9 Tests)

```javascript
const { test, expect } = require("@playwright/test");
const LoginPage = require("../../pages/LoginPage");
const InventoryPage = require("../../pages/InventoryPage");
const TestData = require("../../utils/TestData");

test.describe("Product Catalog Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.performLogin(
      TestData.VALID_USERS.STANDARD_USER.username,
      TestData.VALID_USERS.STANDARD_USER.password
    );
  });

  test("TC009: Product List Display Validation", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBe(6);

    const products = await inventoryPage.getAllProducts();
    for (const product of products) {
      expect(product.name).toBeTruthy();
      expect(product.price).toMatch(/\$\d+\.\d{2}/);
      expect(product.description).toBeTruthy();
    }
  });

  test("TC010: Product Sorting by Name A-Z", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProducts("az");
    const products = await inventoryPage.getAllProducts();

    for (let i = 1; i < products.length; i++) {
      expect(products[i - 1].name <= products[i].name).toBe(true);
    }
  });

  test("TC011: Product Sorting by Price Low to High", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProducts("lohi");
    const products = await inventoryPage.getAllProducts();

    for (let i = 1; i < products.length; i++) {
      const prevPrice = parseFloat(products[i - 1].price.replace("$", ""));
      const currPrice = parseFloat(products[i].price.replace("$", ""));
      expect(prevPrice <= currPrice).toBe(true);
    }
  });
});
```

### 5.3 Test Configuration and Execution

#### 5.3.1 Playwright Configuration

```javascript
// playwright.config.js
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html"],
    ["json", { outputFile: "test-results.json" }],
    ["junit", { outputFile: "results.xml" }],
  ],
  use: {
    baseURL: "https://www.saucedemo.com/v1/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: process.env.CI ? true : false,
  },
  globalSetup: require.resolve("./config/global-setup.js"),
  globalTeardown: require.resolve("./config/global-teardown.js"),
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
```

#### 5.3.2 Global Setup Configuration

```javascript
// config/global-setup.js
async function globalSetup(config) {
  console.log("🚀 Starting Sauce Demo Test Automation Framework");
  console.log("📋 Total Test Scripts: 37");
  console.log("🎯 Target Application: https://www.saucedemo.com/v1/");

  // Create necessary directories
  const fs = require("fs");
  const dirs = ["screenshots", "logs", "test-results"];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

module.exports = globalSetup;
```

## 6. REPORTING AND DOCUMENTATION

### 6.1 Test Reporting Design

- **HTML Reports:** Comprehensive test execution reports with screenshots
- **JSON Reports:** Structured data for integration with external tools
- **Console Logging:** Real-time test execution feedback
- **Screenshot Capture:** Automatic failure documentation
- **Execution Metrics:** Performance and reliability tracking

### 6.2 Reporting Requirements

- **Test Coverage Reporting:** Track which requirements are tested
- **Execution Status Tracking:** Monitor test pass/fail status
- **Performance Metrics:** Measure execution time and efficiency
- **Cross-browser Validation:** Document compatibility across browsers
- **Error Documentation:** Capture and report test failures

### 6.3 Framework Maintenance

- **Version Control:** Git integration for framework code management
- **Modular Design:** Easy updates and extensions via Page Object Model
- **Documentation:** Complete implementation documentation maintained
- **Performance Monitoring:** Execution time and reliability tracking

## 7. FRAMEWORK DESIGN SPECIFICATIONS

### 7.1 Framework Success Criteria

- **37 Automated Test Scripts:** Complete test coverage to be implemented
- **Cross-browser Execution:** Tests to be validated on Chrome, Firefox, Edge, Safari
- **Execution Performance:** Target execution time under 5 minutes
- **Reliability:** High test execution success rate target
- **Maintainability:** Page Object Model design enables easy updates

### 7.2 Quality Assurance Design

- **Code Coverage:** 100% functional requirements coverage target
- **Error Handling:** Comprehensive failure management design
- **Data Management:** Secure and consistent test data handling strategy
- **Documentation:** Complete framework documentation plan

### 7.3 Project Deliverables Design

- **Authentication Module:** 8 test scripts planned
- **Inventory Module:** 9 test scripts planned
- **Cart Module:** 7 test scripts planned
- **Checkout Module:** 8 test scripts planned
- **E2E Module:** 5 test scripts planned
- **Total Design Scope:** 37 automated test scripts

---

**Document Prepared By:** Lakindu De Silva  
**Framework Type:** Playwright + JavaScript + Page Object Model  
**Design Status:** ARCHITECTURE COMPLETE  
**Target Implementation:** 37 automated test scripts across all modules  
**Performance Target:** Sub-5 minute execution time goal
