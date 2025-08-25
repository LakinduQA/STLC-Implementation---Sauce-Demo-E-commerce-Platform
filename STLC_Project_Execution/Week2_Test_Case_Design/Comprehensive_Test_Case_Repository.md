# Comprehensive Test Case Repository

## IEEE YP 2025 STLC Project - Sauce Demo E-Commerce Testing

**Document Version:** 1.0  
**Date:** August 2, 2025  
**Total Test Cases:** 38  
**Application:** Sauce Demo (https://www.saucedemo.com/v1/)

---

## Test Case Distribution Summary

| Module           | Test Cases | Priority | Coverage                |
| ---------------- | ---------- | -------- | ----------------------- |
| Authentication   | 8          | High     | Login/Logout/Session    |
| Product Catalog  | 10         | High     | Display/Sort/Navigation |
| Shopping Cart    | 10         | High     | Add/Remove/Calculations |
| Checkout Process | 8          | High     | Forms/Validation/Flow   |
| End-to-End       | 2          | Critical | Complete User Journey   |
| **Total**        | **38**     | -        | **Complete E-commerce** |

---

## 1. AUTHENTICATION MODULE TEST CASES (8 Cases)

### TC_001: Valid Login with Standard User

**Priority:** High  
**Tags:** @smoke @regression @authentication  
**Test Scenario:** Verify successful login with standard user credentials

**Prerequisites:**

- Browser is open and navigated to https://www.saucedemo.com/v1/
- Application is accessible

**Test Steps:**

1. Verify login page elements are displayed (username field, password field, login button)
2. Enter 'standard_user' in Username field
3. Enter 'secret_sauce' in Password field
4. Click LOGIN button
5. Verify successful redirection to inventory page
6. Verify inventory page elements are loaded correctly

**Expected Results:**

- User is redirected to inventory page (URL contains 'inventory.html')
- Product catalog is displayed with 6 products
- Shopping cart icon is visible
- Logout menu is accessible
- No error messages displayed

**Test Data:**

- Username: standard_user
- Password: secret_sauce

---

### TC_002: Invalid Login - Wrong Password

**Priority:** High  
**Tags:** @regression @authentication @negative  
**Test Scenario:** Verify error handling for incorrect password

**Prerequisites:**

- Browser is open and navigated to login page

**Test Steps:**

1. Enter 'standard_user' in Username field
2. Enter 'wrong_password' in Password field
3. Click LOGIN button
4. Verify error message is displayed
5. Verify user remains on login page

**Expected Results:**

- Error message displayed: "Epic sadface: Username and password do not match any user in this service"
- User remains on login page
- Login form is still accessible
- Error message can be dismissed

**Test Data:**

- Username: standard_user
- Password: wrong_password

---

### TC_003: Locked Out User Login Attempt

**Priority:** High  
**Tags:** @regression @authentication @security  
**Test Scenario:** Verify locked out user cannot access the application

**Prerequisites:**

- Browser is open and navigated to login page

**Test Steps:**

1. Enter 'locked_out_user' in Username field
2. Enter 'secret_sauce' in Password field
3. Click LOGIN button
4. Verify appropriate error message is displayed
5. Verify user cannot access inventory page

**Expected Results:**

- Error message displayed: "Epic sadface: Sorry, this user has been locked out."
- User remains on login page
- No access to protected pages
- Error is prominently displayed

**Test Data:**

- Username: locked_out_user
- Password: secret_sauce

---

### TC_004: Empty Username Validation

**Priority:** Medium  
**Tags:** @regression @authentication @validation  
**Test Scenario:** Verify validation for empty username field

**Prerequisites:**

- Browser is open and navigated to login page

**Test Steps:**

1. Leave Username field empty
2. Enter 'secret_sauce' in Password field
3. Click LOGIN button
4. Verify validation error message
5. Verify login is prevented

**Expected Results:**

- Error message displayed: "Epic sadface: Username is required"
- User remains on login page
- Username field is highlighted or focused
- Login process is blocked

**Test Data:**

- Username: (empty)
- Password: secret_sauce

---

### TC_005: Empty Password Validation

**Priority:** Medium  
**Tags:** @regression @authentication @validation  
**Test Scenario:** Verify validation for empty password field

**Prerequisites:**

- Browser is open and navigated to login page

**Test Steps:**

1. Enter 'standard_user' in Username field
2. Leave Password field empty
3. Click LOGIN button
4. Verify validation error message
5. Verify login is prevented

**Expected Results:**

- Error message displayed: "Epic sadface: Password is required"
- User remains on login page
- Password field is highlighted or focused
- Login process is blocked

**Test Data:**

- Username: standard_user
- Password: (empty)

---

### TC_006: Login with Problem User

**Priority:** Medium  
**Tags:** @regression @authentication @problem  
**Test Scenario:** Verify problem user can login but may have issues

**Prerequisites:**

- Browser is open and navigated to login page

**Test Steps:**

1. Enter 'problem_user' in Username field
2. Enter 'secret_sauce' in Password field
3. Click LOGIN button
4. Verify login is successful
5. Verify inventory page loads (note any issues)
6. Check for image loading problems

**Expected Results:**

- User successfully logs in and reaches inventory page
- Inventory page is displayed
- Product images may have loading issues (expected behavior)
- Cart functionality remains available

**Test Data:**

- Username: problem_user
- Password: secret_sauce

---

### TC_007: Performance Glitch User Login

**Priority:** Medium  
**Tags:** @regression @authentication @performance  
**Test Scenario:** Verify performance glitch user login with delays

**Prerequisites:**

- Browser is open and navigated to login page

**Test Steps:**

1. Enter 'performance_glitch_user' in Username field
2. Enter 'secret_sauce' in Password field
3. Record start time
4. Click LOGIN button
5. Wait for page load and record end time
6. Verify login success despite performance delay

**Expected Results:**

- User successfully logs in (may take longer than normal)
- Login time is noticeably longer (>5 seconds expected)
- Inventory page eventually loads correctly
- All functionality works despite delay

**Test Data:**

- Username: performance_glitch_user
- Password: secret_sauce

---

### TC_008: Error Message Clear Functionality

**Priority:** Low  
**Tags:** @regression @authentication @usability  
**Test Scenario:** Verify error messages can be cleared

**Prerequisites:**

- Browser is open and navigated to login page

**Test Steps:**

1. Enter invalid credentials to trigger error
2. Verify error message is displayed
3. Click the error message dismiss button (X)
4. Verify error message is cleared
5. Verify form is ready for new input

**Expected Results:**

- Error message is displayed initially
- Error dismiss button (X) is clickable
- Error message disappears when dismissed
- Form fields remain populated or are cleared appropriately
- User can attempt login again

**Test Data:**

- Username: invalid_user
- Password: invalid_pass

---

## 2. PRODUCT CATALOG MODULE TEST CASES (10 Cases)

### TC_009: Product Catalog Display Verification

**Priority:** High  
**Tags:** @smoke @regression @inventory  
**Test Scenario:** Verify all products are displayed correctly in catalog

**Prerequisites:**

- User is logged in as standard_user
- Inventory page is loaded

**Test Steps:**

1. Verify inventory container is visible
2. Count total number of products displayed
3. Verify each product has name, image, price, and description
4. Verify "Add to cart" buttons are present for all products
5. Verify product information accuracy

**Expected Results:**

- Exactly 6 products are displayed
- All products show: name, image, price, description, "Add to cart" button
- Product information matches expected data
- Images load correctly (except for problem_user)
- Prices are formatted correctly ($XX.XX)

**Test Data:**

- Expected Products: Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test.allTheThings() T-Shirt (Red)

---

### TC_010: Product Sorting - Name A to Z

**Priority:** High  
**Tags:** @regression @inventory @sorting  
**Test Scenario:** Verify products sort correctly by name A to Z

**Prerequisites:**

- User is logged in and on inventory page

**Test Steps:**

1. Locate the sort dropdown menu
2. Select "Name (A to Z)" option
3. Verify products are sorted alphabetically
4. Check first and last product names
5. Verify sort order is maintained

**Expected Results:**

- Sort dropdown shows "Name (A to Z)" as selected
- Products are arranged in alphabetical order
- First product: "Sauce Labs Backpack"
- Last product: "Test.allTheThings() T-Shirt (Red)"
- Order is consistent and correct

---

### TC_011: Product Sorting - Name Z to A

**Priority:** High  
**Tags:** @regression @inventory @sorting  
**Test Scenario:** Verify products sort correctly by name Z to A

**Prerequisites:**

- User is logged in and on inventory page

**Test Steps:**

1. Select "Name (Z to A)" from sort dropdown
2. Verify products are sorted in reverse alphabetical order
3. Check first and last product names
4. Verify sort order is maintained

**Expected Results:**

- Products are arranged in reverse alphabetical order
- First product: "Test.allTheThings() T-Shirt (Red)"
- Last product: "Sauce Labs Backpack"
- Sort selection is reflected in dropdown

---

### TC_012: Product Sorting - Price Low to High

**Priority:** High  
**Tags:** @regression @inventory @sorting  
**Test Scenario:** Verify products sort correctly by price ascending

**Prerequisites:**

- User is logged in and on inventory page

**Test Steps:**

1. Select "Price (low to high)" from sort dropdown
2. Verify products are sorted by price in ascending order
3. Check that lowest priced item appears first
4. Verify price order is mathematically correct

**Expected Results:**

- Products arranged by price from lowest to highest
- Lowest price product appears first
- Highest price product appears last
- Price sorting is numerically accurate

---

### TC_013: Product Sorting - Price High to Low

**Priority:** High  
**Tags:** @regression @inventory @sorting  
**Test Scenario:** Verify products sort correctly by price descending

**Prerequisites:**

- User is logged in and on inventory page

**Test Steps:**

1. Select "Price (high to low)" from sort dropdown
2. Verify products are sorted by price in descending order
3. Check that highest priced item appears first
4. Verify price order is mathematically correct

**Expected Results:**

- Products arranged by price from highest to lowest
- Highest price product appears first
- Lowest price product appears last
- Price sorting is numerically accurate

---

### TC_014: Add Single Product to Cart

**Priority:** High  
**Tags:** @smoke @regression @inventory @cart  
**Test Scenario:** Verify single product can be added to cart from inventory

**Prerequisites:**

- User is logged in and on inventory page
- Cart is empty

**Test Steps:**

1. Select a product (e.g., Sauce Labs Backpack)
2. Click "Add to cart" button for selected product
3. Verify button text changes to "Remove"
4. Verify cart badge shows count of 1
5. Verify product is added to cart

**Expected Results:**

- "Add to cart" button changes to "Remove"
- Cart badge displays "1"
- Product is successfully added to shopping cart
- Other products remain unaffected

**Test Data:**

- Product: Sauce Labs Backpack
- Expected Price: $29.99

---

### TC_015: Product Detail Page Navigation

**Priority:** Medium  
**Tags:** @regression @inventory @navigation  
**Test Scenario:** Verify navigation to individual product detail pages

**Prerequisites:**

- User is logged in and on inventory page

**Test Steps:**

1. Click on a product name (e.g., "Sauce Labs Backpack")
2. Verify navigation to product detail page
3. Verify product detail page shows correct information
4. Verify "Add to cart" functionality on detail page
5. Verify back navigation to inventory page

**Expected Results:**

- Product detail page loads correctly
- Product name, image, description, and price match inventory
- "Add to cart" button functions correctly
- Back button returns to inventory page
- Navigation is smooth and functional

---

### TC_016: Product Image Verification

**Priority:** Medium  
**Tags:** @regression @inventory @visual  
**Test Scenario:** Verify all product images load correctly

**Prerequisites:**

- User is logged in as standard_user (not problem_user)
- Inventory page is loaded

**Test Steps:**

1. Check each product image for proper loading
2. Verify images are not broken or missing
3. Verify images match product descriptions
4. Check image quality and sizing
5. Verify alt text or accessibility features

**Expected Results:**

- All 6 product images load correctly
- No broken image icons displayed
- Images are appropriate size and quality
- Images match corresponding products
- Proper image accessibility features

---

### TC_017: Product Information Accuracy

**Priority:** High  
**Tags:** @regression @inventory @data  
**Test Scenario:** Verify product information accuracy and consistency

**Prerequisites:**

- User is logged in and on inventory page

**Test Steps:**

1. Verify each product name matches expected values
2. Verify each product price is correctly formatted
3. Verify product descriptions are complete and accurate
4. Cross-check information between inventory and detail pages
5. Verify no missing or incorrect data

**Expected Results:**

- All product names are accurate and consistent
- All prices are formatted as currency ($XX.XX)
- Descriptions are complete and relevant
- Information consistency between pages
- No data integrity issues

**Test Data:**

```
Products Expected:
1. Sauce Labs Backpack - $29.99
2. Sauce Labs Bike Light - $9.99
3. Sauce Labs Bolt T-Shirt - $15.99
4. Sauce Labs Fleece Jacket - $49.99
5. Sauce Labs Onesie - $7.99
6. Test.allTheThings() T-Shirt (Red) - $15.99
```

---

### TC_018: Inventory Page Performance

**Priority:** Medium  
**Tags:** @regression @inventory @performance  
**Test Scenario:** Verify inventory page loads within acceptable time

**Prerequisites:**

- User is logged in
- Network connection is stable

**Test Steps:**

1. Record start time before navigating to inventory
2. Navigate to inventory page
3. Wait for complete page load (all images and content)
4. Record end time and calculate load time
5. Verify performance is acceptable

**Expected Results:**

- Page loads within 5 seconds under normal conditions
- All content loads completely
- No performance-related errors
- Smooth user experience
- Acceptable load time metrics

---

## 3. SHOPPING CART MODULE TEST CASES (10 Cases)

### TC_019: View Empty Cart

**Priority:** High  
**Tags:** @smoke @regression @cart  
**Test Scenario:** Verify empty cart state and messaging

**Prerequisites:**

- User is logged in
- Cart is empty

**Test Steps:**

1. Click on shopping cart icon
2. Navigate to cart page
3. Verify empty cart message is displayed
4. Verify "Continue Shopping" button is present
5. Verify cart total shows $0.00

**Expected Results:**

- Cart page loads successfully
- Empty cart message is clearly displayed
- "Continue Shopping" button is functional
- Cart total displays $0.00
- No product items are shown

---

### TC_020: View Cart with Single Item

**Priority:** High  
**Tags:** @smoke @regression @cart  
**Test Scenario:** Verify cart display with one item

**Prerequisites:**

- User is logged in
- One item added to cart from inventory

**Test Steps:**

1. Add one product to cart from inventory page
2. Navigate to cart page
3. Verify product is displayed in cart
4. Verify product details (name, price, quantity)
5. Verify cart total is calculated correctly

**Expected Results:**

- Cart shows exactly one item
- Product name, price, and description are correct
- Quantity shows 1
- Cart total equals product price
- Remove button is available

**Test Data:**

- Product: Sauce Labs Backpack ($29.99)
- Expected Quantity: 1
- Expected Total: $29.99

---

### TC_021: Add Multiple Different Products

**Priority:** High  
**Tags:** @regression @cart @multi-product  
**Test Scenario:** Verify multiple different products in cart

**Prerequisites:**

- User is logged in
- Cart is empty

**Test Steps:**

1. Add 3 different products to cart from inventory
2. Navigate to cart page
3. Verify all 3 products are displayed
4. Verify each product shows quantity of 1
5. Verify cart total is sum of all product prices

**Expected Results:**

- All 3 products are visible in cart
- Each product shows correct details
- Quantities are correctly displayed
- Cart total is mathematically correct
- All remove buttons are functional

**Test Data:**

- Products: Backpack ($29.99), Bike Light ($9.99), T-Shirt ($15.99)
- Expected Total: $55.97

---

### TC_022: Remove Product from Cart

**Priority:** High  
**Tags:** @regression @cart @removal  
**Test Scenario:** Verify product removal from cart

**Prerequisites:**

- User is logged in
- Cart contains at least one product

**Test Steps:**

1. Navigate to cart page with products
2. Click "Remove" button for one product
3. Verify product is removed from cart
4. Verify cart total is updated
5. Verify cart badge count is updated

**Expected Results:**

- Selected product is removed from cart
- Remaining products stay in cart
- Cart total recalculates correctly
- Cart badge updates count
- Remove action is immediate

---

### TC_023: Cart Quantity Management

**Priority:** Medium  
**Tags:** @regression @cart @quantity  
**Test Scenario:** Verify cart quantity display and behavior

**Prerequisites:**

- User is logged in
- Products are in cart

**Test Steps:**

1. Navigate to cart page
2. Verify quantity is displayed for each product
3. Note: Check if quantity modification is available
4. Verify quantity affects total calculation
5. Test quantity consistency across pages

**Expected Results:**

- Quantity is clearly displayed (default: 1)
- Quantity affects total price calculation
- Quantity remains consistent across navigation
- Quantity display is user-friendly

**Note:** Sauce Demo may not support quantity editing - verify current behavior

---

### TC_024: Cart Persistence Across Sessions

**Priority:** Medium  
**Tags:** @regression @cart @persistence  
**Test Scenario:** Verify cart contents persist during session

**Prerequisites:**

- User is logged in
- Products added to cart

**Test Steps:**

1. Add products to cart
2. Navigate away from cart page
3. Navigate to other pages (inventory, product details)
4. Return to cart page
5. Verify cart contents are preserved

**Expected Results:**

- Cart contents remain intact during navigation
- Product quantities are preserved
- Cart total remains accurate
- Cart badge consistently shows correct count

---

### TC_025: Continue Shopping Functionality

**Priority:** Medium  
**Tags:** @regression @cart @navigation  
**Test Scenario:** Verify "Continue Shopping" button functionality

**Prerequisites:**

- User is on cart page

**Test Steps:**

1. Navigate to cart page (empty or with items)
2. Locate "Continue Shopping" button
3. Click "Continue Shopping" button
4. Verify navigation back to inventory page
5. Verify cart state is maintained

**Expected Results:**

- "Continue Shopping" button is clearly visible
- Button navigates back to inventory page
- Cart contents are preserved
- Smooth navigation experience

---

### TC_026: Cart Total Calculation Accuracy

**Priority:** High  
**Tags:** @regression @cart @calculation @critical  
**Test Scenario:** Verify cart total calculations are accurate

**Prerequisites:**

- User is logged in

**Test Steps:**

1. Add multiple products with different prices to cart
2. Navigate to cart page
3. Manually calculate expected total
4. Compare with displayed cart total
5. Test with various product combinations

**Expected Results:**

- Cart total matches manual calculation
- Subtotal is calculated correctly
- Currency formatting is proper ($XX.XX)
- Calculations handle decimals correctly
- No rounding errors occur

**Test Data:**

```
Test Combinations:
1. Single item: $29.99
2. Two items: $29.99 + $9.99 = $39.98
3. All items: $29.99 + $9.99 + $15.99 + $49.99 + $7.99 + $15.99 = $129.94
```

---

### TC_027: Cart Badge Count Accuracy

**Priority:** Medium  
**Tags:** @regression @cart @badge @ui  
**Test Scenario:** Verify cart badge displays correct item count

**Prerequisites:**

- User is logged in

**Test Steps:**

1. Start with empty cart (no badge should show)
2. Add one item and verify badge shows "1"
3. Add second item and verify badge shows "2"
4. Remove one item and verify badge shows "1"
5. Remove all items and verify badge disappears

**Expected Results:**

- Badge appears only when cart has items
- Badge count matches number of items in cart
- Badge updates immediately when items added/removed
- Badge is visible and properly styled
- Badge behavior is consistent across pages

---

### TC_028: Maximum Cart Capacity

**Priority:** Low  
**Tags:** @regression @cart @boundary  
**Test Scenario:** Verify cart behavior with maximum items

**Prerequisites:**

- User is logged in

**Test Steps:**

1. Add all 6 available products to cart
2. Verify cart accepts all products
3. Check cart total and item count
4. Verify cart page display with maximum items
5. Test navigation and functionality with full cart

**Expected Results:**

- Cart accepts all 6 products successfully
- Cart total calculates correctly for all items
- Cart badge shows "6"
- Cart page displays all items properly
- No performance issues with full cart

**Test Data:**

- All 6 products totaling $129.94

---

## 4. CHECKOUT PROCESS MODULE TEST CASES (8 Cases)

### TC_029: Checkout Step 1 - Valid Information

**Priority:** High  
**Tags:** @smoke @regression @checkout  
**Test Scenario:** Verify checkout form accepts valid customer information

**Prerequisites:**

- User is logged in
- Cart contains at least one product

**Test Steps:**

1. Navigate to cart page
2. Click "Checkout" button
3. Verify navigation to checkout step 1 (customer information)
4. Enter valid first name, last name, and zip code
5. Click "Continue" button
6. Verify progression to checkout step 2

**Expected Results:**

- Checkout step 1 form loads correctly
- All form fields are accessible and functional
- Valid data is accepted without errors
- "Continue" button advances to next step
- Form validation passes for valid input

**Test Data:**

- First Name: John
- Last Name: Doe
- Zip/Postal Code: 12345

---

### TC_030: Checkout Step 1 - Required Field Validation

**Priority:** High  
**Tags:** @regression @checkout @validation  
**Test Scenario:** Verify required field validation in checkout form

**Prerequisites:**

- User is on checkout step 1 page

**Test Steps:**

1. Leave First Name field empty and try to continue
2. Verify error message for missing first name
3. Leave Last Name field empty and try to continue
4. Verify error message for missing last name
5. Leave Zip Code field empty and try to continue
6. Verify error message for missing zip code

**Expected Results:**

- Error message displayed for each missing required field
- User cannot progress with empty required fields
- Error messages are clear and specific
- Form validation prevents submission
- User remains on step 1 until all fields completed

**Test Data:**

- Test each field individually with empty values

---

### TC_031: Checkout Step 2 - Order Summary Verification

**Priority:** High  
**Tags:** @smoke @regression @checkout @summary  
**Test Scenario:** Verify order summary displays correct information

**Prerequisites:**

- User has completed checkout step 1
- On checkout step 2 (overview page)

**Test Steps:**

1. Verify all cart items are displayed in summary
2. Verify item prices are correct
3. Verify item totals are calculated properly
4. Verify tax calculation (if applicable)
5. Verify final total amount
6. Verify payment and shipping information summary

**Expected Results:**

- All cart items listed with correct details
- Item prices match cart prices
- Subtotal calculation is accurate
- Tax amount is calculated correctly (if applicable)
- Final total includes all charges
- Summary information is complete and accurate

---

### TC_032: Checkout Step 2 - Cancel Functionality

**Priority:** Medium  
**Tags:** @regression @checkout @navigation  
**Test Scenario:** Verify checkout cancellation returns user to cart

**Prerequisites:**

- User is on checkout step 2 (overview page)

**Test Steps:**

1. Locate "Cancel" button on checkout overview
2. Click "Cancel" button
3. Verify navigation back to cart page
4. Verify cart contents are preserved
5. Verify no order was processed

**Expected Results:**

- "Cancel" button is clearly visible
- Clicking cancel returns to cart page
- Cart contents remain unchanged
- No order confirmation is generated
- User can resume shopping or checkout again

---

### TC_033: Complete Checkout Process

**Priority:** High  
**Tags:** @smoke @regression @checkout @e2e @critical  
**Test Scenario:** Verify complete end-to-end checkout process

**Prerequisites:**

- User is logged in
- Cart contains products

**Test Steps:**

1. Navigate through complete checkout flow
2. Complete step 1 with valid customer information
3. Review and verify step 2 order summary
4. Click "Finish" button to complete order
5. Verify order confirmation page
6. Verify order completion message

**Expected Results:**

- Complete checkout flow works without errors
- Each step transitions smoothly to next
- Order confirmation page displays success message
- Order appears to be processed successfully
- User receives clear completion confirmation

**Test Data:**

- Customer Info: John Doe, 12345
- Product: At least one item in cart

---

### TC_034: Checkout Form Data Validation

**Priority:** Medium  
**Tags:** @regression @checkout @validation  
**Test Scenario:** Verify checkout form handles various input formats

**Prerequisites:**

- User is on checkout step 1

**Test Steps:**

1. Test first name with special characters
2. Test last name with numbers and symbols
3. Test zip code with letters and special characters
4. Test maximum length input in each field
5. Test minimum length requirements

**Expected Results:**

- Form accepts valid character sets appropriately
- Invalid characters are handled gracefully
- Field length limits are enforced
- Validation messages are helpful and clear
- Form maintains data integrity

**Test Data:**

```
Valid: John, Doe, 12345
Invalid: J0hn!, D0e@#, ABC##
Long: VeryLongFirstNameTesting, VeryLongLastNameTesting, 123456789012345
```

---

### TC_035: Checkout Process with Empty Cart

**Priority:** Medium  
**Tags:** @regression @checkout @edge-case  
**Test Scenario:** Verify checkout behavior with empty cart

**Prerequisites:**

- User is logged in
- Cart is empty

**Test Steps:**

1. Navigate to cart page (empty)
2. Verify checkout button is not available or disabled
3. Attempt to navigate directly to checkout URL
4. Verify appropriate handling of empty cart checkout attempt

**Expected Results:**

- Checkout button is disabled or not shown for empty cart
- Direct navigation to checkout is prevented or handled gracefully
- Appropriate message displayed for empty cart
- User is redirected to cart or inventory page
- No error conditions occur

---

### TC_036: Checkout Error Handling

**Priority:** Medium  
**Tags:** @regression @checkout @error-handling  
**Test Scenario:** Verify checkout process handles errors gracefully

**Prerequisites:**

- User is in checkout process

**Test Steps:**

1. Test form submission with network interruption simulation
2. Test navigation errors during checkout
3. Test browser back button during checkout
4. Test session timeout during checkout
5. Verify error recovery mechanisms

**Expected Results:**

- Network errors are handled gracefully
- Navigation errors don't break checkout process
- Browser back button behavior is appropriate
- Session timeout is handled properly
- Error messages are user-friendly and actionable

---

## 5. END-TO-END TEST SCENARIOS (2 Cases)

### TC_037: Complete Purchase Flow - Single Product

**Priority:** Critical  
**Tags:** @smoke @e2e @critical @end-to-end  
**Test Scenario:** Complete end-to-end user journey for single product purchase

**Prerequisites:**

- Browser is open
- Application is accessible

**Test Steps:**

1. **Authentication:** Navigate to login page and login as standard_user
2. **Product Discovery:** Browse inventory and select Sauce Labs Backpack
3. **Product Selection:** Add product to cart from inventory page
4. **Cart Review:** Navigate to cart and verify product details
5. **Checkout Initiation:** Start checkout process
6. **Information Entry:** Complete customer information form
7. **Order Review:** Review order summary and pricing
8. **Order Completion:** Complete purchase process
9. **Confirmation:** Verify order completion confirmation

**Expected Results:**

- Complete user journey executes successfully
- Each step transitions smoothly to next
- Product information remains consistent throughout
- Pricing calculations are accurate at each step
- Order completion confirmation is received
- No errors or breaks in the flow

**Test Data:**

- User: standard_user / secret_sauce
- Product: Sauce Labs Backpack ($29.99)
- Customer: John Doe, 12345

**Success Criteria:**

- End-to-end completion time < 2 minutes
- No manual intervention required
- All validations pass
- Complete purchase flow successful

---

### TC_038: Complete Purchase Flow - Multiple Products

**Priority:** Critical  
**Tags:** @e2e @critical @end-to-end @multi-product  
**Test Scenario:** Complete end-to-end user journey for multiple product purchase

**Prerequisites:**

- Browser is open
- Application is accessible

**Test Steps:**

1. **Authentication:** Login as standard_user
2. **Product Discovery:** Browse and identify 3 different products
3. **Multi-Product Selection:** Add 3 products to cart:
   - Sauce Labs Backpack ($29.99)
   - Sauce Labs Bike Light ($9.99)
   - Sauce Labs Bolt T-Shirt ($15.99)
4. **Cart Management:** Review cart with multiple items
   - Verify all 3 products are present
   - Verify individual prices and total ($55.97)
   - Test remove functionality (remove bike light)
   - Verify updated total ($45.98)
5. **Checkout Process:** Complete checkout with remaining 2 products
6. **Order Completion:** Finalize purchase
7. **Post-Purchase:** Verify order confirmation

**Expected Results:**

- Multiple product selection works correctly
- Cart accurately maintains multiple items
- Remove functionality works properly
- Total calculations are accurate throughout
- Checkout handles multiple products correctly
- Complete flow successful with final 2 products

**Test Data:**

- User: standard_user / secret_sauce
- Products: Backpack + T-Shirt = $45.98 (after bike light removal)
- Customer: Jane Smith, 67890

**Success Criteria:**

- All cart operations successful
- Mathematical calculations accurate
- Complete purchase flow successful
- Order confirmation received

---

## Test Execution Priority Matrix

| Priority     | Test Cases                         | Execution Order | Dependencies                  |
| ------------ | ---------------------------------- | --------------- | ----------------------------- |
| **Critical** | TC_037, TC_038                     | First           | Complete system functionality |
| **High**     | TC_001-013, TC_019-025, TC_029-033 | Second          | Core module functionality     |
| **Medium**   | TC_014-018, TC_026-028, TC_034-036 | Third           | Extended functionality        |
| **Low**      | Remaining cases                    | Fourth          | Edge cases and validation     |

## Test Data Summary

### User Accounts

- **standard_user:** Primary testing account
- **locked_out_user:** Security testing
- **problem_user:** Issue reproduction
- **performance_glitch_user:** Performance testing

### Product Data

1. Sauce Labs Backpack - $29.99
2. Sauce Labs Bike Light - $9.99
3. Sauce Labs Bolt T-Shirt - $15.99
4. Sauce Labs Fleece Jacket - $49.99
5. Sauce Labs Onesie - $7.99
6. Test.allTheThings() T-Shirt (Red) - $15.99

### Test Scenarios Coverage

- **Positive Scenarios:** 60% (23 test cases)
- **Negative Scenarios:** 25% (9 test cases)
- **Boundary/Edge Cases:** 10% (4 test cases)
- **Security/Validation:** 5% (2 test cases)

---

**Document Control:**

- **Author:** Senior QA Engineer
- **Creation Date:** August 2, 2025
- **Total Test Cases:** 38
- **Review Status:** Ready for Execution
- **Automation Coverage:** 100% (All cases automated with Playwright)

---

_This comprehensive test case repository provides complete coverage of the Sauce Demo e-commerce platform functionality and serves as the foundation for both manual and automated testing execution._
