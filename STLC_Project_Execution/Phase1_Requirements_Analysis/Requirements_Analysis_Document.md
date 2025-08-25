# IEEE YP 2025 STLC PROJECT - REQUIREMENTS ANALYSIS DOCUMENT

**Project:** Software Testing Life Cycle Implementation - Sauce Demo E-commerce Platform  
**Week:** 1 - Requirements Analysis & Test Planning  
**Version:** 1.0

## 1. PROJECT OVERVIEW

### 1.1 Application Under Test

- **Application Name:** Sauce Demo (SwagLabs)
- **URL:** https://www.saucedemo.com/v1/
- **Type:** E-commerce Web Application
- **Platform:** Web-based (Multi-browser compatible)
- **Technology Stack:** HTML, CSS, JavaScript

### 1.2 Project Scope

This document outlines the comprehensive requirements analysis for testing the Sauce Demo e-commerce platform as part of the IEEE YP 2025 Software Testing Life Cycle implementation project.

## 2. FUNCTIONAL REQUIREMENTS ANALYSIS

### 2.1 User Authentication Module

#### 2.1.1 Login Functionality

- **Valid User Credentials:**

  - standard_user / secret_sauce
  - locked_out_user / secret_sauce (locked account)
  - problem_user / secret_sauce (performance issues)
  - performance_glitch_user / secret_sauce (performance testing)
  - error_user / secret_sauce (error scenarios)
  - visual_user / secret_sauce (visual testing)

- **Login Process Flow:**
  1. User enters username and password
  2. System validates credentials
  3. Successful login redirects to inventory page
  4. Failed login displays error message

#### 2.1.2 Logout Functionality

- **Logout Process:**
  1. Access hamburger menu (top-left)
  2. Click "Logout" option
  3. System redirects to login page
  4. Session terminates

### 2.2 Product Catalog Module

#### 2.2.1 Product Inventory Display

- **Product List:** 6 products available

  1. Sauce Labs Backpack ($29.99)
  2. Sauce Labs Bike Light ($9.99)
  3. Sauce Labs Bolt T-Shirt ($15.99)
  4. Sauce Labs Fleece Jacket ($49.99)
  5. Sauce Labs Onesie ($7.99)
  6. Test.allTheThings() T-Shirt (Red) ($15.99)

- **Product Information Displayed:**
  - Product name
  - Product description
  - Product price
  - Product image
  - "ADD TO CART" button

#### 2.2.2 Product Sorting Options

- **Sort Options Available:**
  - Name (A to Z)
  - Name (Z to A)
  - Price (low to high)
  - Price (high to low)

### 2.3 Shopping Cart Module

#### 2.3.1 Add to Cart Functionality

- **Process:**
  1. User clicks "ADD TO CART" button
  2. Button text changes to "REMOVE"
  3. Cart icon updates with item count
  4. Product added to cart

#### 2.3.2 Cart Management

- **Cart Page Features:**
  - QTY (Quantity) column
  - DESCRIPTION column
  - Item details display
  - CONTINUE SHOPPING button
  - CHECKOUT button
  - REMOVE item functionality

### 2.4 Checkout Module

#### 2.4.1 Checkout Process Flow

1. **Step 1: Your Information**

   - First Name (required field)
   - Last Name (required field)
   - Zip/Postal Code (required field)
   - CANCEL button (returns to cart)
   - CONTINUE button (proceeds to overview)

2. **Step 2: Checkout Overview**

   - QTY and DESCRIPTION headers
   - Payment Information: SauceCard #31337
   - Shipping Information: FREE PONY EXPRESS DELIVERY!
   - Item total calculation
   - Tax calculation (8%)
   - Final total calculation
   - CANCEL button (returns to inventory)
   - FINISH button (completes order)

3. **Step 3: Order Confirmation**
   - "THANK YOU FOR YOUR ORDER" message
   - Order dispatch confirmation
   - Pony Express delivery graphic
   - Order completion acknowledgment

### 2.5 Navigation Module

#### 2.5.1 Header Navigation

- **Hamburger Menu (☰):**

  - All Items (returns to inventory)
  - About (external link to saucelabs.com)
  - Logout (session termination)
  - Reset App State (clears cart/session)

- **Shopping Cart Icon:**
  - Displays item count badge
  - Links to cart page

#### 2.5.2 Footer Navigation

- **Social Media Links:**
  - Twitter
  - Facebook
  - LinkedIn
- **Copyright Information:**
  - © 2020 Sauce Labs. All Rights Reserved.
  - Terms of Service | Privacy Policy

## 3. NON-FUNCTIONAL REQUIREMENTS ANALYSIS

### 3.1 Performance Requirements

- **Page Load Time:** < 3 seconds for all pages
- **Response Time:** < 2 seconds for user interactions
- **Concurrent Users:** Support for multiple simultaneous users

### 3.2 Usability Requirements

- **Browser Compatibility:** Chrome, Firefox, Safari, Edge
- **Responsive Design:** Mobile and desktop compatibility
- **Accessibility:** WCAG 2.1 AA compliance

### 3.3 Security Requirements

- **Authentication:** Secure login mechanism
- **Session Management:** Proper session handling
- **Data Protection:** Secure data transmission

### 3.4 Reliability Requirements

- **Availability:** 99.9% uptime
- **Error Handling:** Graceful error management
- **Data Integrity:** Consistent cart and order data

## 4. TECHNICAL SPECIFICATIONS

### 4.1 Browser Requirements

- **Primary Browsers:**
  - Google Chrome (latest version)
  - Mozilla Firefox (latest version)
  - Microsoft Edge (latest version)
  - Safari (latest version)

### 4.2 System Architecture

- **Frontend:** HTML5, CSS3, JavaScript
- **Responsive Framework:** CSS Grid/Flexbox
- **Testing Framework Compatibility:** Playwright, Selenium

## 5. CONSTRAINTS AND ASSUMPTIONS

### 5.1 Constraints

- Limited to web-based testing only
- No backend database access for verification
- Fixed product catalog (6 items)
- Simulated payment processing

### 5.2 Assumptions

- Application is stable for testing purposes
- All test user accounts remain active
- Product prices and inventory remain static
- Network connectivity is reliable

## 6. RISK ANALYSIS

### 6.1 High-Risk Areas

1. **User Authentication:** Multiple user types with different behaviors
2. **Cart State Management:** Session persistence across pages
3. **Checkout Process:** Multi-step form validation
4. **Cross-browser Compatibility:** Consistent functionality across browsers

### 6.2 Medium-Risk Areas

1. **Product Sorting:** Data ordering functionality
2. **Navigation:** Menu and link functionality
3. **Form Validation:** Input field requirements

### 6.3 Low-Risk Areas

1. **Static Content Display:** Product information
2. **Footer Links:** Social media and legal links
3. **Visual Elements:** Images and styling

## 7. TEST DATA REQUIREMENTS

### 7.1 User Credentials

- **Valid Users:** 6 different user types with specific characteristics
- **Invalid Credentials:** For negative testing scenarios

### 7.2 Product Data

- **6 Products:** With varying prices ($7.99 - $49.99)
- **Product Attributes:** Name, description, price, image

### 7.3 Checkout Data

- **Personal Information:** First name, last name, postal code
- **Payment Information:** SauceCard simulation
- **Shipping Information:** Pony Express delivery

## 8. ACCEPTANCE CRITERIA

### 8.1 Functional Acceptance

- All login scenarios work correctly
- Product catalog displays accurately
- Cart operations function properly
- Checkout process completes successfully
- Navigation works across all pages

### 8.2 Non-Functional Acceptance

- Performance meets specified requirements
- Application works across target browsers
- Responsive design functions on mobile devices
- Security measures are in place

## 9. DELIVERABLES SUMMARY

### 9.1 Week 1 Deliverables

✅ **Requirements Analysis Document** (This document)
✅ **Application Feature Discovery** (Through Playwright exploration)


### 9.2 Next Steps

- Test Case Design and Documentation
- Test Environment Setup and Configuration
- Test Execution and Automation Development
- Defect Management and Reporting
- Final Testing and Project Completion

---

**Document Prepared By:** Lakindu De Silva  
**Review Status:** Initial Version  
**Approval Status:** Pending Review  

