# Sauce Demo STLC Automation Framework - JavaScript Implementation

## 🎯 Project Overview

This is a comprehensive JavaScript automation framework for testing the Sauce Demo e-commerce platform, developed as part of the IEEE YP 2025 Software Testing Life Cycle (STLC) project. The framework implements the Page Object Model design pattern with Playwright for robust, maintainable test automation.

## 📋 Features

- **Complete STLC Implementation**: Requirements analysis, test case design, and automation framework
- **Page Object Model**: Maintainable and scalable test architecture
- **Comprehensive Test Coverage**: 30+ test cases covering all critical functionality
- **Multiple User Types**: Tests for standard, problem, performance glitch, and locked out users
- **Cross-Browser Testing**: Chrome, Firefox, Safari, and Edge support
- **Mobile Testing**: iOS and Android device simulation
- **Performance Monitoring**: Built-in performance metrics and monitoring
- **Detailed Reporting**: HTML, JSON, and JUnit report generation
- **Screenshot & Video**: Automatic capture on test failures
- **Parallel Execution**: Configurable parallel test execution

## 🏗️ Project Structure

```
Automation_Framework/
├── pages/                     # Page Object Model classes
│   ├── BasePage.js           # Base page with common functionality
│   ├── LoginPage.js          # Authentication page
│   ├── InventoryPage.js      # Product catalog page
│   ├── CartPage.js           # Shopping cart page
│   └── CheckoutPage.js       # Checkout process pages
├── tests/                     # Test specifications
│   ├── auth/                 # Authentication tests
│   ├── inventory/            # Product catalog tests
│   ├── cart/                 # Shopping cart tests
│   ├── checkout/             # Checkout process tests
│   └── e2e/                  # End-to-end user journey tests
├── utils/                     # Utility classes and helpers
│   ├── TestData.js           # Test data management
│   └── TestUtils.js          # Helper functions and utilities
├── config/                    # Configuration files
│   ├── global-setup.js       # Global test setup
│   └── global-teardown.js    # Global test cleanup
├── playwright.config.js      # Playwright configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "d:\IEEE YP\STLC_Project_Execution\Automation_Framework"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run setup
   ```

### Running Tests

#### Basic Test Execution
```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode for debugging
npm run test:ui

# Run specific test categories
npm run test:smoke      # Smoke tests only
npm run test:regression # Regression tests only
```

#### Module-Specific Tests
```bash
npm run test:login      # Authentication tests
npm run test:inventory  # Product catalog tests
npm run test:cart       # Shopping cart tests
npm run test:checkout   # Checkout process tests
npm run test:e2e        # End-to-end tests
```

#### Browser-Specific Tests
```bash
npm run test:chromium   # Chrome tests only
npm run test:firefox    # Firefox tests only
npm run test:webkit     # Safari tests only
npm run test:mobile     # Mobile device tests
```

#### Performance & Debugging
```bash
npm run test:debug      # Debug mode with DevTools
npm run test:parallel   # Parallel execution (4 workers)
npm run test:serial     # Serial execution (1 worker)
```

### Viewing Reports

```bash
npm run report          # Open HTML report
npm run trace           # View execution traces
```

## 📊 Test Coverage

### Authentication Module (8 Tests)
- ✅ TC001: Valid login with standard user
- ✅ TC002: Invalid login - wrong password
- ✅ TC003: Locked out user login
- ✅ TC004: Empty username validation
- ✅ TC005: Empty password validation
- ✅ TC006: Login with problem user
- ✅ TC007: Performance glitch user login
- ✅ TC008: Error message clear functionality

### Product Catalog Module (10 Tests)
- ✅ TC009: Product catalog display verification
- ✅ TC010: Product sorting - Name A to Z
- ✅ TC011: Product sorting - Name Z to A
- ✅ TC012: Product sorting - Price low to high
- ✅ TC013: Product sorting - Price high to low
- ✅ TC014: Add single product to cart
- ✅ TC015: Add multiple products to cart
- ✅ TC016: Remove product from cart
- ✅ TC017: Product image display
- ✅ TC018: Product details verification

### Shopping Cart Module (7 Tests)
- ✅ TC018: View empty cart
- ✅ TC019: View cart with single item
- ✅ TC020: View cart with multiple items
- ✅ TC021: Remove item from cart
- ✅ TC022: Remove all items from cart
- ✅ TC023: Cart persistence across navigation
- ✅ TC024: Cart item quantity validation

### Checkout Process Module (8 Tests)
- ✅ TC025: Checkout step 1 - valid information
- ✅ TC026: Checkout step 1 - empty first name validation
- ✅ TC027: Checkout step 1 - empty last name validation
- ✅ TC028: Checkout step 1 - empty postal code validation
- ✅ TC029: Checkout step 2 - order summary verification
- ✅ TC030: Complete checkout process
- ✅ TC031: Checkout with multiple items
- ✅ TC032: Checkout cancel functionality

### End-to-End Tests (5 Tests)
- ✅ E2E001: Complete purchase flow - single product
- ✅ E2E002: Complete purchase flow - multiple products
- ✅ E2E003: Shopping experience with problem user
- ✅ E2E004: Performance testing with performance glitch user
- ✅ E2E005: Comprehensive shopping cart management

## 🔧 Configuration

### Environment Configuration

The framework supports multiple environments and configurations:

```javascript
// playwright.config.js
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'https://www.saucedemo.com/v1/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

### Test Data Management

All test data is centralized in `utils/TestData.js`:

```javascript
// Example usage
const user = TestData.users.standard;
const product = TestData.products.backpack;
const customerInfo = TestData.getCustomerInfo('valid');
```

### Custom Utilities

The framework includes comprehensive utilities in `utils/TestUtils.js`:

```javascript
// Performance monitoring
const metrics = await TestUtils.capturePerformanceMetrics(page);

// Screenshot capture
await TestUtils.saveScreenshot(page, 'test-name');

// Test logging
TestUtils.logTestExecution('TC001', 'PASS', 'Login successful');
```

## 📈 Reporting & Analytics

### HTML Reports
- Comprehensive test execution reports
- Screenshots and videos for failed tests
- Performance metrics and timing data
- Cross-browser compatibility results

### Trace Viewer
- Step-by-step execution traces
- Network activity monitoring
- DOM snapshots at each step
- Performance waterfall charts

### Logs & Metrics
- Detailed execution logs in `./logs/`
- Performance metrics tracking
- Test execution summaries
- Error analysis and debugging info

## 🎯 Best Practices

### Page Object Model
- **Separation of Concerns**: Page objects handle element interactions
- **Reusability**: Common functionality in BasePage class
- **Maintainability**: Changes in UI require updates only in page objects

### Test Design
- **Independent Tests**: Each test can run in isolation
- **Data-Driven**: Test data separated from test logic
- **Descriptive Names**: Clear test names and step descriptions
- **Assertions**: Comprehensive validation at each step

### Error Handling
- **Automatic Screenshots**: Captured on test failures
- **Retry Logic**: Configurable retry mechanisms
- **Graceful Degradation**: Tests continue even if non-critical steps fail
- **Detailed Logging**: Comprehensive error reporting

## 🔍 Debugging

### Visual Debugging
```bash
npm run test:debug      # Run tests with DevTools
npm run test:headed     # Run with visible browser
npm run trace           # View execution traces
```

### Selective Test Execution
```bash
# Run specific test
npx playwright test tests/auth/login.test.js

# Run tests matching pattern
npx playwright test --grep "TC001"

# Run failed tests only
npx playwright test --last-failed
```

### Performance Analysis
```bash
# Enable performance metrics
TEST_PERFORMANCE=true npm test

# Run with detailed timing
npm run test:serial
```

## 🚀 Continuous Integration

### GitHub Actions / CI Configuration
```yaml
- name: Install dependencies
  run: npm ci

- name: Install Playwright Browsers
  run: npx playwright install --with-deps

- name: Run Playwright tests
  run: npm run test:ci
```

### Docker Support
```bash
npm run test:docker     # Run tests in Docker container
```

## 📞 Support & Maintenance

### Framework Maintenance
- **Regular Updates**: Keep Playwright and dependencies updated
- **Browser Compatibility**: Test across latest browser versions
- **Performance Monitoring**: Track test execution times
- **Code Quality**: Regular linting and code reviews

### Extending the Framework
- **New Page Objects**: Follow the existing pattern in `pages/`
- **Additional Tests**: Use the established test structure
- **Custom Utilities**: Add helper functions to `utils/TestUtils.js`
- **Test Data**: Extend `utils/TestData.js` for new test scenarios

## 📊 Performance Benchmarks

### Typical Execution Times
- **Single Test**: 5-15 seconds
- **Module Tests**: 2-5 minutes
- **Full Test Suite**: 15-20 minutes
- **Cross-Browser Suite**: 45-60 minutes

### Scalability
- **Parallel Workers**: 4-8 workers recommended
- **Memory Usage**: ~200MB per worker
- **Storage**: ~50MB for reports and artifacts

---

## 🏆 IEEE YP 2025 STLC Project

This automation framework represents a complete implementation of the Software Testing Life Cycle, demonstrating:

- **Week 1**: Requirements analysis and test strategy
- **Week 2**: Comprehensive test case design
- **Week 3**: Automation framework development
- **Week 4**: Test execution and reporting
- **Week 5**: Performance testing and optimization
- **Week 6**: Documentation and delivery

**Project Status**: ✅ **COMPLETE** - Ready for production use

---

*Developed with ❤️ for the IEEE YP 2025 Software Testing Life Cycle Project*
