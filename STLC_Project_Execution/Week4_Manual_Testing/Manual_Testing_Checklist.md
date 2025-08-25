# 📋 Manual Testing Checklist - IEEE YP 2025 STLC Project

## Project Information

**Application:** Sauce Demo E-commerce Platform  
**URL:** https://www.saucedemo.com/v1/  
**Testing Phase:** Week 4 - Manual & Exploratory Testing  
**Automation Coverage:** 74.32% (434/584 tests passing)

---

## 🎯 Manual Testing Scope

_Areas requiring human validation that automation cannot effectively cover_

### **1. 🔍 Accessibility Testing (Critical)**

#### **A. Keyboard Navigation**

- [ ] **Tab Navigation:** All interactive elements accessible via Tab key
- [ ] **Focus Management:** Clear visual focus indicators on all elements
- [ ] **Skip Links:** Navigate directly to main content areas
- [ ] **Escape Key:** Close modals and exit interactions properly
- [ ] **Enter/Space:** Activate buttons and links consistently
- [ ] **Arrow Keys:** Navigate within dropdown menus and lists

#### **B. Screen Reader Compatibility**

- [ ] **ARIA Labels:** All form fields have proper labels
- [ ] **Alt Text:** Product images have descriptive alternative text
- [ ] **Page Structure:** Proper heading hierarchy (H1, H2, H3)
- [ ] **Form Validation:** Error messages read aloud properly
- [ ] **Dynamic Content:** Cart updates announced to screen readers
- [ ] **Button States:** Add/Remove cart button state changes announced

#### **C. Visual Accessibility**

- [ ] **Color Contrast:** Text meets WCAG 2.1 AA standards
- [ ] **Text Scaling:** Content readable at 200% zoom level
- [ ] **Color Dependencies:** Information not conveyed through color alone
- [ ] **Animation Controls:** Respect user's motion preferences

### **2. 🎨 Visual & UI Testing**

#### **A. Cross-Browser Visual Consistency**

- [ ] **Chrome:** Layout, fonts, spacing consistency
- [ ] **Firefox:** Form rendering and button styles
- [ ] **Safari:** Image loading and cart display
- [ ] **Edge:** Checkout process visual alignment
- [ ] **Mobile Safari:** Touch targets and responsive design
- [ ] **Mobile Chrome:** Product grid layout on small screens

#### **B. Responsive Design Validation**

- [ ] **Desktop (1920x1080):** Full product catalog display
- [ ] **Laptop (1366x768):** Navigation and cart accessibility
- [ ] **Tablet (768x1024):** Portrait/landscape mode switching
- [ ] **Mobile (375x667):** Touch-friendly checkout process
- [ ] **Large Screen (2560x1440):** Content not over-stretched

#### **C. Visual Elements**

- [ ] **Product Images:** Load completely and display correctly
- [ ] **Icons:** Cart, user, and navigation icons clear and recognizable
- [ ] **Buttons:** Hover states and pressed states visually distinct
- [ ] **Loading States:** Appropriate feedback during page transitions
- [ ] **Error States:** Clear visual indication of form errors

### **3. 🧠 Usability & User Experience**

#### **A. Navigation Flow**

- [ ] **Breadcrumb Logic:** Clear path understanding for users
- [ ] **Back Button:** Browser back button works as expected
- [ ] **Deep Linking:** Direct URLs to products and cart work correctly
- [ ] **Search Expectations:** Users can find products intuitively
- [ ] **Checkout Flow:** Logical progression through steps

#### **B. User Interaction Patterns**

- [ ] **Add to Cart:** Immediate visual feedback and confirmation
- [ ] **Quantity Changes:** Clear controls for increasing/decreasing
- [ ] **Remove Items:** Confirmation or undo capability
- [ ] **Form Completion:** Helpful placeholder text and validation
- [ ] **Error Recovery:** Users can easily correct mistakes

#### **C. Content & Messaging**

- [ ] **Product Descriptions:** Accurate and helpful information
- [ ] **Error Messages:** Clear, actionable, and non-technical
- [ ] **Success Messages:** Confirming user actions appropriately
- [ ] **Empty States:** Helpful guidance when cart is empty
- [ ] **Loading Messages:** Informative feedback during waits

### **4. 🔄 Exploratory Testing Scenarios**

#### **A. Edge Cases**

- [ ] **Rapid Clicking:** Add to cart button multiple rapid clicks
- [ ] **Browser Refresh:** During checkout process mid-way
- [ ] **Multiple Tabs:** Same user in multiple browser tabs
- [ ] **Session Timeout:** Long idle time during shopping
- [ ] **Network Interruption:** Poor connectivity during checkout

#### **B. Boundary Value Testing**

- [ ] **Maximum Cart Items:** Add all 6 products multiple times
- [ ] **Long Form Data:** Very long names and postal codes
- [ ] **Special Characters:** Names with accents, symbols, spaces
- [ ] **Empty Form Submission:** Various combinations of empty fields
- [ ] **Invalid Postal Codes:** Different formats and invalid codes

#### **C. User Behavior Simulation**

- [ ] **Comparison Shopping:** Add items, remove, add different items
- [ ] **Abandoned Cart:** Add items, navigate away, return later
- [ ] **Price Verification:** Calculate totals manually vs system
- [ ] **Checkout Abandonment:** Start checkout, go back to shopping
- [ ] **Multiple User Types:** Test with all 4 available user accounts

### **5. ⚡ Performance & Load**

#### **A. Page Load Performance**

- [ ] **Initial Load:** Home page loads within 3 seconds
- [ ] **Product Images:** All images load within 5 seconds
- [ ] **Navigation Speed:** Page transitions feel responsive
- [ ] **Form Submission:** Checkout steps complete promptly
- [ ] **Mobile Performance:** Acceptable speed on mobile devices

#### **B. Network Conditions**

- [ ] **Slow 3G:** Functionality works on poor connections
- [ ] **Offline Mode:** Appropriate error messages when offline
- [ ] **WiFi Switching:** Handles network changes gracefully
- [ ] **Timeout Handling:** Appropriate user feedback for slow responses

### **6. 🔒 Security & Privacy**

#### **A. Data Handling**

- [ ] **Password Masking:** Login password field properly masked
- [ ] **Form Autocomplete:** Appropriate autocomplete attributes
- [ ] **Session Management:** Proper logout clears user data
- [ ] **URL Manipulation:** Direct URL access handled securely
- [ ] **Console Logging:** No sensitive data exposed in browser console

#### **B. Input Validation**

- [ ] **SQL Injection:** Basic injection attempts in form fields
- [ ] **XSS Prevention:** Script tags in input fields handled
- [ ] **Data Sanitization:** Special characters handled appropriately
- [ ] **File Upload:** If any upload functionality exists

---

## 📝 Manual Testing Execution Template

### **Test Case Format:**

```
Test ID: MT_001
Test Area: [Accessibility/Usability/Visual/Exploratory/Performance/Security]
Test Scenario: [Brief description]
Preconditions: [Setup required]
Test Steps:
1. [Step 1]
2. [Step 2]
3. [Step 3]
Expected Result: [What should happen]
Actual Result: [What actually happened]
Status: [Pass/Fail/Blocked]
Priority: [High/Medium/Low]
Browser: [Chrome/Firefox/Safari/Edge/Mobile]
Screenshots: [If applicable]
Notes: [Additional observations]
```

### **Example Manual Test Case:**

```
Test ID: MT_001
Test Area: Accessibility
Test Scenario: Keyboard navigation through checkout process
Preconditions:
- User logged in as standard_user
- Product added to cart
- Using keyboard only (no mouse)

Test Steps:
1. Press Tab to navigate to cart icon and press Enter
2. Tab to "Checkout" button and press Enter
3. Tab through form fields and fill using keyboard only
4. Tab to "Continue" button and press Enter
5. Tab to "Finish" button and press Enter

Expected Result:
- Clear focus indicators visible at each step
- All form fields accessible via keyboard
- Successfully complete checkout using only keyboard
- Screen reader announces important state changes

Actual Result: [To be filled during execution]
Status: [To be determined]
Priority: High
Browser: Chrome
Screenshots: [If any issues found]
Notes: [Any observations about focus management]
```

---

## 🎯 Manual Testing Priority Matrix

### **High Priority (Must Test)**

1. ✅ Accessibility keyboard navigation
2. ✅ Cross-browser visual consistency
3. ✅ Mobile responsive design
4. ✅ Checkout process usability
5. ✅ Error message clarity

### **Medium Priority (Should Test)**

1. 🔶 Exploratory edge cases
2. 🔶 Performance on slow networks
3. 🔶 Multiple tab behavior
4. 🔶 Form validation edge cases
5. 🔶 User experience flows

### **Low Priority (Nice to Test)**

1. 🔽 Advanced accessibility features
2. 🔽 Security input validation
3. 🔽 Browser compatibility edge cases
4. 🔽 Extreme boundary values
5. 🔽 Network interruption scenarios

---

## 📊 Manual Testing Completion Tracking

### **Module Completion Status:**

- [ ] **Accessibility Testing:** 0% (0/15 tests)
- [ ] **Visual & UI Testing:** 0% (0/12 tests)
- [ ] **Usability Testing:** 0% (0/10 tests)
- [ ] **Exploratory Testing:** 0% (0/15 tests)
- [ ] **Performance Testing:** 0% (0/8 tests)
- [ ] **Security Testing:** 0% (0/6 tests)

**Overall Manual Testing Progress: 0% (0/66 manual tests)**

### **Estimated Effort:**

- **Total Manual Tests:** 66 test scenarios
- **Estimated Time:** 16-20 hours
- **Recommended Duration:** 3-4 days
- **Testing Tools Needed:** Screen reader, browser dev tools, mobile devices

---

## 📋 Defect Reporting Template

### **Manual Testing Defect Report:**

```
Defect ID: MD_001
Module: [Authentication/Inventory/Cart/Checkout/General]
Severity: [Critical/High/Medium/Low]
Priority: [P1/P2/P3/P4]
Type: [Accessibility/Usability/Visual/Performance/Security]

Summary: [One-line description]

Environment:
- Browser: [Chrome 120.0.6099.129]
- OS: [Windows 11]
- Device: [Desktop/Mobile]
- Screen Resolution: [1920x1080]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected Behavior: [What should happen]
Actual Behavior: [What actually happens]

Impact: [How this affects users]
Workaround: [If any exists]
Screenshots/Videos: [Attached]
Additional Notes: [Any other observations]
```

---

## ✅ **Summary**

This manual testing checklist covers the critical areas that automated testing cannot effectively validate. Focus on **accessibility** and **usability** testing as these provide the highest value and are most important for a comprehensive STLC demonstration.

**Recommended Execution Order:**

1. **Accessibility Testing** (High impact, demonstrates professional testing)
2. **Cross-browser Visual Testing** (Easy to execute, good coverage)
3. **Mobile Responsive Testing** (Critical for modern applications)
4. **Usability & UX Testing** (Provides valuable insights)
5. **Exploratory Testing** (Find edge cases automation missed)

This manual testing will complement your **74.32% automated test coverage** to achieve comprehensive application validation suitable for IEEE YP presentation.
