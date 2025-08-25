# IEEE YP 2025 STLC PROJECT - TEST DATA IMPLEMENTATION GUIDE

**Project:** Software Testing Life Cycle Implementation - Sauce Demo E-commerce Platform  
**Version:** 1.0  
**Purpose:** Automation-Ready Data Source & Developer Working Document  
**Format:** JSON-Structured Data for Playwright Integration

## 1. TEST DATA OVERVIEW

### 1.1 Purpose

This document defines comprehensive test data management for the Sauce Demo e-commerce platform testing project, ensuring consistent, reliable, and reusable test data across all testing phases.

**Document Relationship:**

- **This Document (Implementation Guide):** JSON-structured data ready for Playwright automation
- **Companion Document:** `Test_Data_Reference_Manual.md` - Complete data dictionary with boundary testing, security scenarios, and comprehensive reference data

### 1.2 Test Data Categories

- **User Authentication Data:** Login credentials for various user types
- **Product Catalog Data:** Complete product information and pricing
- **Customer Information Data:** Checkout form test data sets
- **Expected Results Data:** Validation data for automated testing
- **Test Environment Data:** URLs and configuration parameters

### 1.3 Data Management Principles

- **Consistency:** Standardized data formats across all test cases
- **Reusability:** Common data sets for multiple test scenarios
- **Maintainability:** Centralized data management for easy updates
- **Security:** Secure handling of authentication credentials
- **Traceability:** Clear mapping between test data and test cases

## 2. USER AUTHENTICATION TEST DATA

### 2.1 Valid User Credentials

#### 2.1.1 Standard User (Primary Test Account)

```json
{
  "username": "standard_user",
  "password": "secret_sauce",
  "userType": "standard",
  "expectedBehavior": "normal",
  "testCases": [
    "TC001",
    "TC007",
    "TC009",
    "TC013",
    "TC014",
    "TC015",
    "TC016",
    "TC017",
    "TC019",
    "TC020",
    "TC021",
    "TC022",
    "TC023",
    "TC024"
  ],
  "description": "Primary user account for standard testing scenarios"
}
```

#### 2.1.2 Problem User (Issue Testing Account)

```json
{
  "username": "problem_user",
  "password": "secret_sauce",
  "userType": "problem",
  "expectedBehavior": "known_issues",
  "testCases": ["TC002"],
  "description": "User account with known issues for negative testing"
}
```

#### 2.1.3 Performance Glitch User

```json
{
  "username": "performance_glitch_user",
  "password": "secret_sauce",
  "userType": "performance",
  "expectedBehavior": "performance_issues",
  "testCases": ["Performance testing scenarios"],
  "description": "User account for performance testing scenarios"
}
```

#### 2.1.4 Error User

```json
{
  "username": "error_user",
  "password": "secret_sauce",
  "userType": "error",
  "expectedBehavior": "error_scenarios",
  "testCases": ["Error handling scenarios"],
  "description": "User account for error scenario testing"
}
```

#### 2.1.5 Visual User

```json
{
  "username": "visual_user",
  "password": "secret_sauce",
  "userType": "visual",
  "expectedBehavior": "visual_testing",
  "testCases": ["Visual testing scenarios"],
  "description": "User account for visual regression testing"
}
```

### 2.2 Invalid User Credentials (Negative Testing)

#### 2.2.1 Locked User Account

```json
{
  "username": "locked_out_user",
  "password": "secret_sauce",
  "userType": "locked",
  "expectedBehavior": "account_locked",
  "testCases": ["TC005"],
  "expectedError": "Epic sadface: Sorry, this user has been locked out.",
  "description": "Locked user account for security testing"
}
```

#### 2.2.2 Invalid Username Test Data

```json
{
  "username": "invalid_user",
  "password": "secret_sauce",
  "userType": "invalid",
  "expectedBehavior": "login_failure",
  "testCases": ["TC003"],
  "expectedError": "Epic sadface: Username and password do not match any user in this service",
  "description": "Invalid username for negative testing"
}
```

#### 2.2.3 Invalid Password Test Data

```json
{
  "username": "standard_user",
  "password": "wrong_password",
  "userType": "invalid",
  "expectedBehavior": "login_failure",
  "testCases": ["TC004"],
  "expectedError": "Epic sadface: Username and password do not match any user in this service",
  "description": "Invalid password for negative testing"
}
```

#### 2.2.4 Empty Fields Test Data

```json
{
  "username": "",
  "password": "",
  "userType": "empty",
  "expectedBehavior": "validation_error",
  "testCases": ["TC006"],
  "expectedError": "Epic sadface: Username is required",
  "description": "Empty login fields for validation testing"
}
```

## 3. PRODUCT CATALOG TEST DATA

### 3.1 Complete Product Inventory

#### 3.1.1 Sauce Labs Backpack

```json
{
  "id": "sauce-labs-backpack",
  "name": "Sauce Labs Backpack",
  "description": "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
  "price": "$29.99",
  "priceNumeric": 29.99,
  "image": "sauce-labs-backpack.png",
  "testCases": ["TC009", "TC011", "TC013", "TC014", "TC016", "TC020"],
  "category": "Accessories"
}
```

#### 3.1.2 Sauce Labs Bike Light

```json
{
  "id": "sauce-labs-bike-light",
  "name": "Sauce Labs Bike Light",
  "description": "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
  "price": "$9.99",
  "priceNumeric": 9.99,
  "image": "sauce-labs-bike-light.png",
  "testCases": ["TC009", "TC011", "TC015", "TC017", "TC022"],
  "category": "Accessories"
}
```

#### 3.1.3 Sauce Labs Bolt T-Shirt

```json
{
  "id": "sauce-labs-bolt-t-shirt",
  "name": "Sauce Labs Bolt T-Shirt",
  "description": "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
  "price": "$15.99",
  "priceNumeric": 15.99,
  "image": "sauce-labs-bolt-t-shirt.png",
  "testCases": ["TC009", "TC011"],
  "category": "Clothing"
}
```

#### 3.1.4 Sauce Labs Fleece Jacket

```json
{
  "id": "sauce-labs-fleece-jacket",
  "name": "Sauce Labs Fleece Jacket",
  "description": "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
  "price": "$49.99",
  "priceNumeric": 49.99,
  "image": "sauce-labs-fleece-jacket.png",
  "testCases": ["TC009", "TC011"],
  "category": "Clothing"
}
```

#### 3.1.5 Sauce Labs Onesie

```json
{
  "id": "sauce-labs-onesie",
  "name": "Sauce Labs Onesie",
  "description": "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
  "price": "$7.99",
  "priceNumeric": 7.99,
  "image": "sauce-labs-onesie.png",
  "testCases": ["TC009", "TC011", "TC015"],
  "category": "Clothing"
}
```

#### 3.1.6 Test.allTheThings() T-Shirt (Red)

```json
{
  "id": "test-allthethings-t-shirt-red",
  "name": "Test.allTheThings() T-Shirt (Red)",
  "description": "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton blend.",
  "price": "$15.99",
  "priceNumeric": 15.99,
  "image": "red-tatt-1200x1500.png",
  "testCases": ["TC009", "TC011"],
  "category": "Clothing"
}
```

### 3.2 Product Sorting Test Data

#### 3.2.1 Alphabetical Sorting (A to Z)

```json
{
  "sortType": "name_asc",
  "sortLabel": "Name (A to Z)",
  "expectedOrder": [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Onesie",
    "Test.allTheThings() T-Shirt (Red)"
  ],
  "testCases": ["TC010"]
}
```

#### 3.2.2 Reverse Alphabetical Sorting (Z to A)

```json
{
  "sortType": "name_desc",
  "sortLabel": "Name (Z to A)",
  "expectedOrder": [
    "Test.allTheThings() T-Shirt (Red)",
    "Sauce Labs Onesie",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Bike Light",
    "Sauce Labs Backpack"
  ],
  "testCases": ["TC010"]
}
```

#### 3.2.3 Price Sorting (Low to High)

```json
{
  "sortType": "price_asc",
  "sortLabel": "Price (low to high)",
  "expectedOrder": [
    { "name": "Sauce Labs Onesie", "price": "$7.99" },
    { "name": "Sauce Labs Bike Light", "price": "$9.99" },
    { "name": "Sauce Labs Bolt T-Shirt", "price": "$15.99" },
    { "name": "Test.allTheThings() T-Shirt (Red)", "price": "$15.99" },
    { "name": "Sauce Labs Backpack", "price": "$29.99" },
    { "name": "Sauce Labs Fleece Jacket", "price": "$49.99" }
  ],
  "testCases": ["TC010"]
}
```

#### 3.2.4 Price Sorting (High to Low)

```json
{
  "sortType": "price_desc",
  "sortLabel": "Price (high to low)",
  "expectedOrder": [
    { "name": "Sauce Labs Fleece Jacket", "price": "$49.99" },
    { "name": "Sauce Labs Backpack", "price": "$29.99" },
    { "name": "Sauce Labs Bolt T-Shirt", "price": "$15.99" },
    { "name": "Test.allTheThings() T-Shirt (Red)", "price": "$15.99" },
    { "name": "Sauce Labs Bike Light", "price": "$9.99" },
    { "name": "Sauce Labs Onesie", "price": "$7.99" }
  ],
  "testCases": ["TC010"]
}
```

## 4. CUSTOMER INFORMATION TEST DATA

### 4.1 Valid Customer Information Sets

#### 4.1.1 Primary Customer Data Set

```json
{
  "customerSet": "primary",
  "firstName": "John",
  "lastName": "Smith",
  "postalCode": "12345",
  "fullName": "John Smith",
  "testCases": ["TC020", "TC022", "TC023"],
  "description": "Primary customer data for standard checkout testing"
}
```

#### 4.1.2 Alternative Customer Data Set 1

```json
{
  "customerSet": "alternative1",
  "firstName": "Jane",
  "lastName": "Doe",
  "postalCode": "67890",
  "fullName": "Jane Doe",
  "testCases": ["Alternate checkout scenarios"],
  "description": "Alternative customer data for varied testing"
}
```

#### 4.1.3 Alternative Customer Data Set 2

```json
{
  "customerSet": "alternative2",
  "firstName": "Michael",
  "lastName": "Johnson",
  "postalCode": "54321",
  "fullName": "Michael Johnson",
  "testCases": ["Additional checkout scenarios"],
  "description": "Second alternative customer data set"
}
```

### 4.2 Invalid Customer Information (Form Validation)

#### 4.2.1 Empty Fields Test Data

```json
{
  "customerSet": "empty_all",
  "firstName": "",
  "lastName": "",
  "postalCode": "",
  "expectedError": "Error: First Name is required",
  "testCases": ["TC021"],
  "description": "All empty fields for form validation testing"
}
```

#### 4.2.2 Missing First Name

```json
{
  "customerSet": "missing_firstName",
  "firstName": "",
  "lastName": "Smith",
  "postalCode": "12345",
  "expectedError": "Error: First Name is required",
  "testCases": ["TC021"],
  "description": "Missing first name validation test"
}
```

#### 4.2.3 Missing Last Name

```json
{
  "customerSet": "missing_lastName",
  "firstName": "John",
  "lastName": "",
  "postalCode": "12345",
  "expectedError": "Error: Last Name is required",
  "testCases": ["TC021"],
  "description": "Missing last name validation test"
}
```

#### 4.2.4 Missing Postal Code

```json
{
  "customerSet": "missing_postalCode",
  "firstName": "John",
  "lastName": "Smith",
  "postalCode": "",
  "expectedError": "Error: Postal Code is required",
  "testCases": ["TC021"],
  "description": "Missing postal code validation test"
}
```

## 5. CHECKOUT PROCESS TEST DATA

### 5.1 Payment Information Data

```json
{
  "paymentMethod": "SauceCard #31337",
  "cardType": "SauceCard",
  "cardNumber": "#31337",
  "testCases": ["TC020", "TC022"],
  "description": "Simulated payment method for checkout process"
}
```

### 5.2 Shipping Information Data

```json
{
  "shippingMethod": "FREE PONY EXPRESS DELIVERY!",
  "shippingCost": "$0.00",
  "deliveryMessage": "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
  "testCases": ["TC020", "TC022", "TC023"],
  "description": "Shipping information for checkout process"
}
```

### 5.3 Tax Calculation Data

```json
{
  "taxRate": 0.08,
  "taxPercentage": "8%",
  "taxCalculationMethod": "subtotal * 0.08",
  "testCases": ["TC022"],
  "description": "Tax calculation parameters for order total validation"
}
```

## 6. EXPECTED RESULTS DATA

### 6.1 Single Item Order Calculations

```json
{
  "orderType": "single_item",
  "item": "Sauce Labs Backpack",
  "itemPrice": 29.99,
  "quantity": 1,
  "subtotal": 29.99,
  "tax": 2.4,
  "total": 32.39,
  "testCases": ["TC020"],
  "description": "Expected calculations for single item orders"
}
```

### 6.2 Multiple Item Order Calculations

```json
{
  "orderType": "multiple_items",
  "items": [
    { "name": "Sauce Labs Backpack", "price": 29.99, "quantity": 1 },
    { "name": "Sauce Labs Bike Light", "price": 9.99, "quantity": 1 }
  ],
  "subtotal": 39.98,
  "tax": 3.2,
  "total": 43.18,
  "testCases": ["TC015", "TC022"],
  "description": "Expected calculations for multiple item orders"
}
```

### 6.3 Cart Item Counter Data

```json
{
  "scenario": "cart_counter_progression",
  "steps": [
    { "action": "initial", "expectedCount": 0, "displayState": "empty" },
    { "action": "add_one", "expectedCount": 1, "displayState": "1" },
    { "action": "add_two_more", "expectedCount": 3, "displayState": "3" },
    { "action": "remove_one", "expectedCount": 2, "displayState": "2" },
    { "action": "remove_all", "expectedCount": 0, "displayState": "empty" }
  ],
  "testCases": ["TC019"],
  "description": "Expected cart counter behavior for testing"
}
```

## 7. ENVIRONMENT CONFIGURATION DATA

### 7.1 Application URLs

```json
{
  "baseUrl": "https://www.saucedemo.com/v1/",
  "pages": {
    "login": "https://www.saucedemo.com/v1/index.html",
    "inventory": "https://www.saucedemo.com/v1/inventory.html",
    "cart": "https://www.saucedemo.com/v1/cart.html",
    "checkoutStepOne": "https://www.saucedemo.com/v1/checkout-step-one.html",
    "checkoutStepTwo": "https://www.saucedemo.com/v1/checkout-step-two.html",
    "checkoutComplete": "https://www.saucedemo.com/v1/checkout-complete.html"
  },
  "externalUrls": {
    "aboutPage": "https://saucelabs.com/"
  }
}
```

### 7.2 Browser Configuration Data

```json
{
  "browsers": [
    { "name": "Chrome", "version": "latest", "headless": false },
    { "name": "Firefox", "version": "latest", "headless": false },
    { "name": "Edge", "version": "latest", "headless": false },
    { "name": "Safari", "version": "latest", "headless": false }
  ],
  "viewport": {
    "width": 1920,
    "height": 1080
  },
  "timeout": {
    "default": 30000,
    "navigation": 60000,
    "element": 10000
  }
}
```

## 8. TEST DATA USAGE MATRIX

### 8.1 Test Case to Data Mapping

| Test Case | User Data       | Product Data    | Customer Data    | Expected Results   |
| --------- | --------------- | --------------- | ---------------- | ------------------ |
| TC001     | standard_user   | -               | -                | Login success      |
| TC002     | problem_user    | -               | -                | Login with issues  |
| TC003     | invalid_user    | -               | -                | Login failure      |
| TC004     | wrong_password  | -               | -                | Login failure      |
| TC005     | locked_out_user | -               | -                | Account locked     |
| TC006     | empty_fields    | -               | -                | Validation error   |
| TC007     | standard_user   | -               | -                | Logout success     |
| TC008     | -               | -               | -                | Password masking   |
| TC009     | standard_user   | All products    | -                | Product display    |
| TC010     | standard_user   | Sorting data    | -                | Sort validation    |
| TC011     | standard_user   | Product details | -                | Data accuracy      |
| TC012     | standard_user   | Product images  | -                | Image display      |
| TC013     | standard_user   | Backpack        | -                | Add to cart        |
| TC014     | standard_user   | Backpack        | -                | Single item cart   |
| TC015     | standard_user   | Multiple items  | -                | Multiple item cart |
| TC016     | standard_user   | Backpack        | -                | Remove from cart   |
| TC017     | standard_user   | Multiple items  | -                | Cart persistence   |
| TC018     | standard_user   | -               | -                | Empty cart         |
| TC019     | standard_user   | Multiple items  | -                | Counter validation |
| TC020     | standard_user   | Backpack        | Primary customer | Complete checkout  |
| TC021     | standard_user   | Any item        | Invalid customer | Form validation    |
| TC022     | standard_user   | Multiple items  | Primary customer | Order overview     |
| TC023     | standard_user   | Any item        | Primary customer | Order confirmation |
| TC024     | standard_user   | -               | -                | Navigation test    |
| TC025     | -               | -               | -                | Footer validation  |

### 8.2 Data Dependency Management

- **Sequential Dependencies:** Cart tests require prior login
- **Data Isolation:** Each test case should reset to known state
- **Data Cleanup:** Cart clearing after checkout completion
- **State Management:** Session persistence across test steps

## 9. DATA SECURITY AND MANAGEMENT

### 9.1 Security Considerations

- **Credential Protection:** Store test credentials securely
- **Data Encryption:** Encrypt sensitive test data at rest
- **Access Control:** Limit access to test data repositories
- **Audit Trail:** Log test data usage and modifications

### 9.2 Data Maintenance Procedures

- **Regular Updates:** Update test data when application changes
- **Validation Checks:** Verify test data accuracy periodically
- **Backup Procedures:** Maintain backups of test data sets
- **Version Control:** Track test data changes over time

### 9.3 Data Storage Structure

```
TestData/
├── UserCredentials/
│   ├── validUsers.json
│   └── invalidUsers.json
├── ProductCatalog/
│   ├── productDetails.json
│   └── sortingData.json
├── CustomerInfo/
│   ├── validCustomers.json
│   └── invalidCustomers.json
├── ExpectedResults/
│   ├── calculations.json
│   └── validations.json
└── Environment/
    ├── urls.json
    └── browserConfig.json
```

## 10. AUTOMATION FRAMEWORK DATA INTEGRATION

### 10.1 Page Object Model Data Binding

- **LoginPage:** User credential data binding
- **InventoryPage:** Product catalog data integration
- **CartPage:** Cart state and calculation data
- **CheckoutPages:** Customer information and validation data
- **NavigationComponents:** URL and navigation data

### 10.2 Test Data Utilities

- **DataProvider Class:** Centralized test data access
- **ValidationHelper Class:** Expected results comparison
- **TestDataGenerator:** Dynamic test data creation
- **DataCleanup Class:** Post-test data management

### 10.3 Configuration Management

- **Environment-specific Data:** Development, staging, production
- **Browser-specific Data:** Cross-browser test variations
- **Locale-specific Data:** International testing support
- **Feature-specific Data:** Module-based data organization

---

**Document Prepared By:** Lakindu De Silva  
**Review Status:** Ready for Implementation  
**Data Coverage:** Complete test data sets for all 37 test cases  
**Integration Ready:** Structured for automation framework implementation  
**Security Compliant:** Follows data security best practices
