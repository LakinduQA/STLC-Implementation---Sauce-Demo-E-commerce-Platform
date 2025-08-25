# IEEE YP 2025 STLC PROJECT - AUTOMATION FRAMEWORK ARCHITECTURE

**Project:** Software Testing Life Cycle Implementation - Sauce Demo E-commerce Platform  
**Week:** 2 - Test Case Design & Documentation  
**Date:** January 2, 2025  
**Version:** 1.0

## 1. FRAMEWORK OVERVIEW

### 1.1 Framework Selection: Playwright with TypeScript

**Rationale for Playwright:**

- **Modern Browser Automation:** Fast, reliable, and supports all major browsers
- **Built-in Wait Strategies:** Automatic waiting for elements and network requests
- **Rich API:** Comprehensive set of actions and assertions
- **Cross-browser Support:** Chrome, Firefox, Safari, Edge without additional drivers
- **Headless/Headed Modes:** Flexible execution options for debugging and CI/CD
- **Screenshot/Video Capture:** Built-in failure documentation
- **Network Interception:** Advanced testing capabilities for API validation

**TypeScript Benefits:**

- **Type Safety:** Compile-time error detection and IntelliSense support
- **Code Maintainability:** Better code organization and refactoring capabilities
- **Team Collaboration:** Improved code readability and documentation
- **IDE Support:** Enhanced development experience with VS Code

### 1.2 Framework Architecture Pattern: Page Object Model (POM)

**Benefits of POM:**

- **Code Reusability:** Common page interactions shared across tests
- **Maintainability:** Centralized element management and page logic
- **Readability:** Clear separation between test logic and page implementation
- **Scalability:** Easy addition of new pages and test scenarios

### 1.3 Framework Objectives

- **Implement 15 automated test scripts** covering critical e-commerce functionality
- **Provide robust test execution** with consistent results across environments
- **Generate comprehensive reports** with screenshots and detailed logs
- **Support CI/CD integration** for continuous testing implementation
- **Enable easy maintenance** and extension of test coverage

## 2. FRAMEWORK STRUCTURE

### 2.1 Directory Organization

```
Automation_Framework/
├── tests/
│   ├── auth/
│   │   ├── login.spec.ts
│   │   ├── logout.spec.ts
│   │   └── authentication.spec.ts
│   ├── products/
│   │   ├── inventory.spec.ts
│   │   ├── sorting.spec.ts
│   │   └── productValidation.spec.ts
│   ├── cart/
│   │   ├── cartOperations.spec.ts
│   │   ├── cartPersistence.spec.ts
│   │   └── cartCounter.spec.ts
│   ├── checkout/
│   │   ├── checkoutFlow.spec.ts
│   │   ├── formValidation.spec.ts
│   │   └── orderConfirmation.spec.ts
│   └── navigation/
│       └── navigation.spec.ts
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPages.ts
│   └── NavigationComponent.ts
├── utils/
│   ├── TestData.ts
│   ├── TestHelpers.ts
│   ├── Constants.ts
│   └── DataProvider.ts
├── fixtures/
│   ├── testData.json
│   ├── users.json
│   ├── products.json
│   └── expectedResults.json
├── reports/
│   ├── html-report/
│   ├── test-results/
│   └── screenshots/
├── configs/
│   ├── playwright.config.ts
│   ├── test.config.ts
│   └── environments.ts
├── package.json
├── tsconfig.json
└── README.md
```

### 2.2 Core Components Architecture

#### 2.2.1 Page Object Classes

- **BasePage.ts:** Common page functionality and utilities
- **LoginPage.ts:** Authentication page interactions
- **InventoryPage.ts:** Product catalog operations
- **CartPage.ts:** Shopping cart management
- **CheckoutPages.ts:** Multi-step checkout process
- **NavigationComponent.ts:** Header and menu navigation

#### 2.2.2 Test Specification Files

- **Authentication Tests:** TC001, TC002, TC003, TC004, TC005, TC007
- **Product Tests:** TC009, TC010, TC011, TC013
- **Cart Tests:** TC014, TC015, TC016, TC017, TC019
- **Checkout Tests:** TC020, TC021, TC022, TC023
- **Navigation Tests:** TC024

#### 2.2.3 Utility Classes

- **TestData.ts:** Centralized test data management
- **TestHelpers.ts:** Common helper functions and utilities
- **Constants.ts:** Application constants and configuration values
- **DataProvider.ts:** Dynamic test data generation and management

## 3. PAGE OBJECT MODEL DESIGN

### 3.1 BasePage Class Structure

```typescript
export class BasePage {
  protected page: Page;
  protected timeout: number = 30000;

  constructor(page: Page) {
    this.page = page;
  }

  // Common navigation methods
  async navigateTo(url: string): Promise<void>;
  async waitForPageLoad(): Promise<void>;
  async takeScreenshot(name: string): Promise<void>;

  // Common element interactions
  async clickElement(selector: string): Promise<void>;
  async typeText(selector: string, text: string): Promise<void>;
  async getText(selector: string): Promise<string>;
  async isElementVisible(selector: string): Promise<boolean>;
  async waitForElement(selector: string): Promise<void>;

  // Common validations
  async verifyPageTitle(expectedTitle: string): Promise<void>;
  async verifyCurrentUrl(expectedUrl: string): Promise<void>;
}
```

### 3.2 LoginPage Class Design

```typescript
export class LoginPage extends BasePage {
  // Page Elements
  private readonly usernameField = '[data-test="username"]';
  private readonly passwordField = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';

  // Page Actions
  async navigateToLogin(): Promise<void>;
  async enterUsername(username: string): Promise<void>;
  async enterPassword(password: string): Promise<void>;
  async clickLoginButton(): Promise<void>;
  async performLogin(username: string, password: string): Promise<void>;

  // Page Validations
  async getErrorMessage(): Promise<string>;
  async isErrorDisplayed(): Promise<boolean>;
  async verifyLoginPageElements(): Promise<void>;
}
```

### 3.3 InventoryPage Class Design

```typescript
export class InventoryPage extends BasePage {
  // Page Elements
  private readonly inventoryContainer = ".inventory_list";
  private readonly productItems = ".inventory_item";
  private readonly sortDropdown = ".product_sort_container";
  private readonly addToCartButtons = '[data-test*="add-to-cart"]';
  private readonly cartIcon = ".shopping_cart_link";
  private readonly cartBadge = ".shopping_cart_badge";

  // Page Actions
  async getAllProducts(): Promise<ProductInfo[]>;
  async addProductToCart(productName: string): Promise<void>;
  async removeProductFromCart(productName: string): Promise<void>;
  async sortProducts(sortOption: string): Promise<void>;
  async navigateToCart(): Promise<void>;

  // Page Validations
  async getProductCount(): Promise<number>;
  async verifyProductDetails(
    productName: string,
    expectedDetails: ProductInfo
  ): Promise<void>;
  async getCartItemCount(): Promise<number>;
  async verifySortingOrder(sortType: string): Promise<void>;
}
```

### 3.4 CartPage Class Design

```typescript
export class CartPage extends BasePage {
  // Page Elements
  private readonly cartItems = ".cart_item";
  private readonly removeButtons = '[data-test*="remove"]';
  private readonly continueShoppingButton = '[data-test="continue-shopping"]';
  private readonly checkoutButton = '[data-test="checkout"]';
  private readonly cartQuantity = ".cart_quantity";

  // Page Actions
  async getCartItems(): Promise<CartItem[]>;
  async removeItemFromCart(itemName: string): Promise<void>;
  async continueShopping(): Promise<void>;
  async proceedToCheckout(): Promise<void>;

  // Page Validations
  async getCartItemCount(): Promise<number>;
  async verifyCartItem(
    itemName: string,
    expectedDetails: CartItem
  ): Promise<void>;
  async isCartEmpty(): Promise<boolean>;
  async getTotalPrice(): Promise<number>;
}
```

### 3.5 CheckoutPages Class Design

```typescript
export class CheckoutPages extends BasePage {
  // Checkout Step One Elements
  private readonly firstNameField = '[data-test="firstName"]';
  private readonly lastNameField = '[data-test="lastName"]';
  private readonly postalCodeField = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly cancelButton = '[data-test="cancel"]';

  // Checkout Step Two Elements
  private readonly paymentInfo = ".summary_info_label";
  private readonly shippingInfo = ".summary_info_label";
  private readonly itemTotal = ".summary_subtotal_label";
  private readonly tax = ".summary_tax_label";
  private readonly total = ".summary_total_label";
  private readonly finishButton = '[data-test="finish"]';

  // Checkout Complete Elements
  private readonly confirmationMessage = ".complete-header";
  private readonly completeText = ".complete-text";

  // Step One Actions
  async fillCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void>;
  async continueToOverview(): Promise<void>;
  async cancelCheckout(): Promise<void>;

  // Step Two Actions
  async getOrderSummary(): Promise<OrderSummary>;
  async finishOrder(): Promise<void>;

  // Validations
  async verifyOrderDetails(expectedOrder: OrderSummary): Promise<void>;
  async verifyOrderConfirmation(): Promise<void>;
  async getFormValidationError(): Promise<string>;
}
```

## 4. TEST DATA MANAGEMENT

### 4.1 TestData Class Structure

```typescript
export class TestData {
  // User Credentials
  static readonly VALID_USERS = {
    STANDARD_USER: { username: "standard_user", password: "secret_sauce" },
    PROBLEM_USER: { username: "problem_user", password: "secret_sauce" },
    PERFORMANCE_GLITCH_USER: {
      username: "performance_glitch_user",
      password: "secret_sauce",
    },
  };

  static readonly INVALID_USERS = {
    LOCKED_OUT_USER: { username: "locked_out_user", password: "secret_sauce" },
    INVALID_USER: { username: "invalid_user", password: "secret_sauce" },
    WRONG_PASSWORD: { username: "standard_user", password: "wrong_password" },
  };

  // Product Information
  static readonly PRODUCTS = {
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
  };

  // Customer Information
  static readonly CUSTOMERS = {
    PRIMARY: { firstName: "John", lastName: "Smith", postalCode: "12345" },
    ALTERNATIVE: { firstName: "Jane", lastName: "Doe", postalCode: "67890" },
  };

  // Expected Results
  static readonly EXPECTED_RESULTS = {
    TAX_RATE: 0.08,
    PAYMENT_INFO: "SauceCard #31337",
    SHIPPING_INFO: "FREE PONY EXPRESS DELIVERY!",
    CONFIRMATION_MESSAGE: "THANK YOU FOR YOUR ORDER",
  };
}
```

### 4.2 Dynamic Data Provider

```typescript
export class DataProvider {
  static generateCustomerData(): CustomerInfo {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      postalCode: faker.address.zipCode(),
    };
  }

  static getRandomProduct(): ProductInfo {
    const products = Object.values(TestData.PRODUCTS);
    return products[Math.floor(Math.random() * products.length)];
  }

  static calculateExpectedTotal(items: CartItem[]): OrderCalculation {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const tax = subtotal * TestData.EXPECTED_RESULTS.TAX_RATE;
    const total = subtotal + tax;

    return { subtotal, tax, total };
  }
}
```

## 5. AUTOMATION SCRIPT SPECIFICATIONS

### 5.1 Authentication Test Scripts (6 scripts)

#### 5.1.1 TC001 - Valid Login with Standard User

```typescript
test("TC001: Valid Login with Standard User", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigateToLogin();
  await loginPage.performLogin(
    TestData.VALID_USERS.STANDARD_USER.username,
    TestData.VALID_USERS.STANDARD_USER.password
  );

  await inventoryPage.verifyInventoryPageLoaded();
  await expect(page).toHaveURL(/.*inventory.html/);
});
```

#### 5.1.2 TC002 - Valid Login with Problem User

```typescript
test("TC002: Valid Login with Problem User", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigateToLogin();
  await loginPage.performLogin(
    TestData.VALID_USERS.PROBLEM_USER.username,
    TestData.VALID_USERS.PROBLEM_USER.password
  );

  await inventoryPage.verifyInventoryPageLoaded();
  // Note: Document any observed issues for problem_user
});
```

#### 5.1.3 TC003 - Invalid Login - Wrong Username

```typescript
test("TC003: Invalid Login - Wrong Username", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLogin();
  await loginPage.performLogin(
    TestData.INVALID_USERS.INVALID_USER.username,
    TestData.INVALID_USERS.INVALID_USER.password
  );

  await expect(await loginPage.isErrorDisplayed()).toBe(true);
  await expect(page).toHaveURL(/.*index.html/);
});
```

#### 5.1.4 TC004 - Invalid Login - Wrong Password

```typescript
test("TC004: Invalid Login - Wrong Password", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLogin();
  await loginPage.performLogin(
    TestData.INVALID_USERS.WRONG_PASSWORD.username,
    TestData.INVALID_USERS.WRONG_PASSWORD.password
  );

  await expect(await loginPage.isErrorDisplayed()).toBe(true);
  await expect(page).toHaveURL(/.*index.html/);
});
```

#### 5.1.5 TC005 - Locked User Account Handling

```typescript
test("TC005: Locked User Account Handling", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLogin();
  await loginPage.performLogin(
    TestData.INVALID_USERS.LOCKED_OUT_USER.username,
    TestData.INVALID_USERS.LOCKED_OUT_USER.password
  );

  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain("locked out");
  await expect(page).toHaveURL(/.*index.html/);
});
```

#### 5.1.6 TC007 - Logout Functionality

```typescript
test("TC007: Logout Functionality", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const navigation = new NavigationComponent(page);

  await loginPage.navigateToLogin();
  await loginPage.performLogin(
    TestData.VALID_USERS.STANDARD_USER.username,
    TestData.VALID_USERS.STANDARD_USER.password
  );

  await inventoryPage.verifyInventoryPageLoaded();
  await navigation.logout();
  await expect(page).toHaveURL(/.*index.html/);
});
```

### 5.2 Product Catalog Test Scripts (4 scripts)

#### 5.2.1 TC009 - Product List Display Validation

```typescript
test("TC009: Product List Display Validation", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigateToLogin();
  await loginPage.performLogin(
    TestData.VALID_USERS.STANDARD_USER.username,
    TestData.VALID_USERS.STANDARD_USER.password
  );

  const productCount = await inventoryPage.getProductCount();
  expect(productCount).toBe(6);

  const products = await inventoryPage.getAllProducts();
  for (const product of products) {
    expect(product.name).toBeTruthy();
    expect(product.price).toMatch(/\$\d+\.\d{2}/);
    expect(product.description).toBeTruthy();
  }
});
```

#### 5.2.2 TC010 - Product Sorting Functionality

```typescript
test("TC010: Product Sorting Functionality", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigateToLogin();
  await loginPage.performLogin(
    TestData.VALID_USERS.STANDARD_USER.username,
    TestData.VALID_USERS.STANDARD_USER.password
  );

  // Test Name (A to Z) sorting
  await inventoryPage.sortProducts("az");
  await inventoryPage.verifySortingOrder("name_asc");

  // Test Name (Z to A) sorting
  await inventoryPage.sortProducts("za");
  await inventoryPage.verifySortingOrder("name_desc");

  // Test Price (low to high) sorting
  await inventoryPage.sortProducts("lohi");
  await inventoryPage.verifySortingOrder("price_asc");

  // Test Price (high to low) sorting
  await inventoryPage.sortProducts("hilo");
  await inventoryPage.verifySortingOrder("price_desc");
});
```

### 5.3 Shopping Cart Test Scripts (5 scripts)

#### 5.3.1 TC014 - Add Single Item to Cart

```typescript
test("TC014: Add Single Item to Cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.navigateToLogin();
  await loginPage.performLogin(
    TestData.VALID_USERS.STANDARD_USER.username,
    TestData.VALID_USERS.STANDARD_USER.password
  );

  await inventoryPage.addProductToCart(TestData.PRODUCTS.BACKPACK.name);
  const cartCount = await inventoryPage.getCartItemCount();
  expect(cartCount).toBe(1);

  await inventoryPage.navigateToCart();
  const cartItems = await cartPage.getCartItems();
  expect(cartItems).toHaveLength(1);
  expect(cartItems[0].name).toBe(TestData.PRODUCTS.BACKPACK.name);
});
```

### 5.4 Test Configuration and Execution

#### 5.4.1 Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
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
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
```

## 6. REPORTING AND DOCUMENTATION

### 6.1 Test Reporting Strategy

- **HTML Reports:** Comprehensive test execution reports with screenshots
- **JSON Reports:** Structured data for integration with external tools
- **JUnit Reports:** CI/CD integration compatibility
- **Screenshot Capture:** Automatic failure documentation
- **Video Recording:** Full test execution recording for debugging

### 6.2 Error Handling and Debugging

- **Try-Catch Blocks:** Comprehensive error handling in page objects
- **Custom Error Messages:** Detailed failure descriptions
- **Debug Logging:** Configurable logging levels for troubleshooting
- **Element Wait Strategies:** Robust element interaction handling

### 6.3 Maintenance and Updates

- **Version Control:** Git integration for framework code management
- **Code Reviews:** Peer review process for framework changes
- **Documentation Updates:** Regular documentation maintenance
- **Framework Evolution:** Continuous improvement based on testing needs

## 7. CI/CD INTEGRATION READINESS

### 7.1 GitHub Actions Configuration

```yaml
name: Playwright Tests
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### 7.2 Docker Support

```dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-focal

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npx", "playwright", "test"]
```

## 8. SUCCESS METRICS AND VALIDATION

### 8.1 Framework Success Criteria

- **15 Automated Test Scripts:** All critical test cases implemented
- **Cross-browser Execution:** Tests run successfully on Chrome, Firefox, Edge, Safari
- **Execution Time:** Complete test suite completes within 30 minutes
- **Reliability:** 95% test execution success rate
- **Maintainability:** Page Object Model enables easy updates and extensions

### 8.2 Quality Assurance Measures

- **Code Coverage:** 100% coverage of identified automated test cases
- **Error Handling:** Robust failure management and reporting
- **Data Management:** Consistent and secure test data handling
- **Documentation:** Complete framework documentation and usage guidelines

---

**Document Prepared By:** IEEE YP STLC Project Team  
**Framework Type:** Playwright + TypeScript + Page Object Model  
**Automation Coverage:** 15 test cases across 5 functional modules  
**Implementation Status:** Architecture defined, ready for development  
**Integration:** CI/CD ready with comprehensive reporting
