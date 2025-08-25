# Postman Network Analysis Collection

## IEEE YP 2025 STLC Project - Sauce Demo E-Commerce Testing

**Document Version:** 1.0  
**Date:** August 2, 2025  
**Collection Name:** Sauce_Demo_Network_Analysis  
**Total Test Scenarios:** 10  
**Application:** https://www.saucedemo.com/v1/

---

## Collection Overview

This document outlines the Postman collection for network analysis and form validation testing of the Sauce Demo platform. The collection focuses on backend communication, form submissions, and API response validation.

### Collection Structure

```
Sauce_Demo_Network_Analysis/
├── 01_Authentication_Flow/
│   ├── Login_Form_Submission
│   ├── Invalid_Login_Response
│   └── Session_Cookie_Validation
├── 02_Form_Validation/
│   ├── Checkout_Form_Submission
│   ├── Required_Field_Validation
│   └── Form_Data_Structure_Analysis
├── 03_Performance_Monitoring/
│   ├── Page_Load_Analysis
│   ├── Resource_Loading_Validation
│   └── Network_Request_Monitoring
└── 04_Error_Handling/
    └── HTTP_Status_Code_Validation
```

---

## MANUAL SETUP INSTRUCTIONS

### Step 1: Install Postman

1. Download Postman from https://www.postman.com/downloads/
2. Install and create a free account
3. Create a new workspace named "IEEE_YP_2025_STLC"

### Step 2: Create Collection

1. Click "New" → "Collection"
2. Name: "Sauce_Demo_Network_Analysis"
3. Description: "Network analysis for IEEE YP 2025 STLC Project"

### Step 3: Add Environment Variables

Create environment "Sauce_Demo_Env" with variables:

- `base_url`: https://www.saucedemo.com/v1
- `valid_username`: standard_user
- `valid_password`: secret_sauce
- `invalid_username`: invalid_user
- `invalid_password`: wrong_password

---

## 1. AUTHENTICATION FLOW SCENARIOS

### Scenario 1: Login Form Submission Analysis

**Purpose:** Analyze the network traffic during successful login

**Setup Instructions:**

1. **Method:** POST
2. **URL:** `{{base_url}}/`
3. **Headers:**
   ```
   Content-Type: application/x-www-form-urlencoded
   ```
4. **Body (x-www-form-urlencoded):**
   ```
   user-name: {{valid_username}}
   password: {{valid_password}}
   ```

**Expected Network Behavior:**

- **Request Method:** POST
- **Response Status:** 302 (Redirect) or 200 (Success)
- **Response Headers:** Location header with redirect URL
- **Session Management:** Cookie with session identifier

**Validation Tests:**

```javascript
// Status Code Test
pm.test("Login returns success status", function () {
  pm.expect(pm.response.code).to.be.oneOf([200, 302]);
});

// Response Time Test
pm.test("Login response time is acceptable", function () {
  pm.expect(pm.response.responseTime).to.be.below(3000);
});

// Cookie Validation Test
pm.test("Session cookie is set", function () {
  pm.expect(pm.cookies.has("session-username")).to.be.true;
});
```

**Manual Verification Steps:**

1. Use browser Developer Tools → Network tab
2. Enter valid credentials and submit login form
3. Observe POST request to base URL
4. Verify response includes redirect to inventory.html
5. Check for session cookies in response headers

---

### Scenario 2: Invalid Login Response Validation

**Purpose:** Verify error handling for invalid credentials

**Setup Instructions:**

1. **Method:** POST
2. **URL:** `{{base_url}}/`
3. **Body (x-www-form-urlencoded):**
   ```
   user-name: {{invalid_username}}
   password: {{invalid_password}}
   ```

**Expected Network Behavior:**

- **Request Method:** POST
- **Response Status:** 200 (with error content)
- **Response Body:** Contains error message
- **No Redirect:** User remains on login page

**Validation Tests:**

```javascript
// Error Response Test
pm.test("Invalid login returns error", function () {
  pm.expect(pm.response.code).to.equal(200);
  pm.expect(pm.response.text()).to.include("Epic sadface");
});

// No Session Cookie Test
pm.test("No session cookie for invalid login", function () {
  pm.expect(pm.cookies.has("session-username")).to.be.false;
});
```

---

### Scenario 3: Session Cookie Validation

**Purpose:** Analyze session management and cookie handling

**Setup Instructions:**

1. First login with valid credentials (Scenario 1)
2. **Method:** GET
3. **URL:** `{{base_url}}/inventory.html`
4. **Headers:** Include cookies from login response

**Expected Network Behavior:**

- **Request Method:** GET
- **Response Status:** 200 (Authorized access)
- **Session Validation:** Cookie authentication successful
- **Content:** Inventory page content loaded

**Validation Tests:**

```javascript
// Authorized Access Test
pm.test("Inventory page accessible with valid session", function () {
  pm.expect(pm.response.code).to.equal(200);
  pm.expect(pm.response.text()).to.include("inventory_container");
});
```

---

## 2. FORM VALIDATION SCENARIOS

### Scenario 4: Checkout Form Submission

**Purpose:** Analyze checkout form data transmission

**Prerequisites:** Must be logged in and have items in cart

**Setup Instructions:**

1. **Method:** POST
2. **URL:** `{{base_url}}/checkout-step-one.html`
3. **Body (x-www-form-urlencoded):**
   ```
   firstName: John
   lastName: Doe
   postalCode: 12345
   ```

**Expected Network Behavior:**

- **Request Method:** POST
- **Response Status:** 302 (Redirect to checkout-step-two.html)
- **Form Data:** Customer information transmitted securely
- **Validation:** All required fields processed

**Validation Tests:**

```javascript
// Checkout Form Submission Test
pm.test("Checkout form submission successful", function () {
  pm.expect(pm.response.code).to.be.oneOf([200, 302]);
});

// Redirect Validation Test
pm.test("Redirected to checkout step 2", function () {
  const location = pm.response.headers.get("Location");
  pm.expect(location).to.include("checkout-step-two.html");
});
```

---

### Scenario 5: Required Field Validation

**Purpose:** Test form validation for missing required fields

**Setup Instructions:**

1. **Method:** POST
2. **URL:** `{{base_url}}/checkout-step-one.html`
3. **Body (x-www-form-urlencoded):**
   ```
   firstName:
   lastName: Doe
   postalCode: 12345
   ```

**Expected Network Behavior:**

- **Request Method:** POST
- **Response Status:** 200 (Form validation error)
- **Error Message:** "Error: First Name is required"
- **No Redirect:** User remains on form page

**Validation Tests:**

```javascript
// Required Field Validation Test
pm.test("Missing required field returns error", function () {
  pm.expect(pm.response.code).to.equal(200);
  pm.expect(pm.response.text()).to.include("Error: First Name is required");
});
```

---

### Scenario 6: Form Data Structure Analysis

**Purpose:** Analyze the structure and format of form submissions

**Setup Instructions:**

1. **Method:** POST
2. **URL:** `{{base_url}}/checkout-step-one.html`
3. **Body (x-www-form-urlencoded):**
   ```
   firstName: TestFirstName
   lastName: TestLastName
   postalCode: 12345
   ```

**Network Analysis Points:**

- **Content-Type:** application/x-www-form-urlencoded
- **Encoding:** UTF-8 character encoding
- **Data Format:** URL-encoded key-value pairs
- **Security:** No sensitive data exposure

---

## 3. PERFORMANCE MONITORING SCENARIOS

### Scenario 7: Page Load Analysis

**Purpose:** Monitor performance metrics for page loading

**Setup Instructions:**

1. **Method:** GET
2. **URL:** `{{base_url}}/inventory.html`
3. **Headers:** Include session cookies

**Performance Metrics to Monitor:**

- **Response Time:** Time to receive HTML content
- **Content Size:** Total response size in bytes
- **Resource Count:** Number of additional resources loaded
- **Cache Headers:** Browser caching directives

**Validation Tests:**

```javascript
// Performance Test
pm.test("Page load time is acceptable", function () {
  pm.expect(pm.response.responseTime).to.be.below(2000);
});

// Content Size Test
pm.test("Response size is reasonable", function () {
  const responseSize = pm.response.headers.get("Content-Length");
  pm.expect(parseInt(responseSize)).to.be.below(50000); // 50KB limit
});
```

---

### Scenario 8: Resource Loading Validation

**Purpose:** Analyze static resource loading (CSS, JS, Images)

**Setup Instructions:**
Monitor these resource requests:

1. **CSS Files:** `{{base_url}}/static/css/main.css`
2. **JavaScript Files:** `{{base_url}}/static/js/main.js`
3. **Images:** `{{base_url}}/static/media/*.jpg`

**Expected Network Behavior:**

- **Response Status:** 200 for all resources
- **Cache Headers:** Appropriate caching strategies
- **Content Types:** Correct MIME types
- **Compression:** Gzip or similar compression

---

### Scenario 9: Network Request Monitoring

**Purpose:** Monitor all network requests during user journey

**Monitoring Points:**

1. **Initial Page Load:** Login page resources
2. **Authentication:** Login form submission
3. **Navigation:** Page transitions
4. **Dynamic Content:** AJAX requests (if any)

**Performance Benchmarks:**

- **DNS Resolution:** < 100ms
- **Connection Time:** < 200ms
- **First Byte Time:** < 500ms
- **Total Load Time:** < 3000ms

---

## 4. ERROR HANDLING SCENARIOS

### Scenario 10: HTTP Status Code Validation

**Purpose:** Validate proper HTTP status codes for different scenarios

**Test Cases:**

#### 10.1 Valid Resource Access

- **URL:** `{{base_url}}/inventory.html` (with valid session)
- **Expected Status:** 200 OK

#### 10.2 Unauthorized Access

- **URL:** `{{base_url}}/inventory.html` (without session)
- **Expected Status:** 302 Redirect to login

#### 10.3 Non-Existent Resource

- **URL:** `{{base_url}}/nonexistent-page.html`
- **Expected Status:** 404 Not Found

#### 10.4 Invalid Form Submission

- **URL:** `{{base_url}}/checkout-step-one.html` (malformed data)
- **Expected Status:** 400 Bad Request or 200 with error

**Validation Tests:**

```javascript
// Status Code Validation Suite
pm.test("Authorized request returns 200", function () {
  pm.expect(pm.response.code).to.equal(200);
});

pm.test("Unauthorized request redirects", function () {
  pm.expect(pm.response.code).to.equal(302);
});

pm.test("Invalid resource returns 404", function () {
  pm.expect(pm.response.code).to.equal(404);
});
```

---

## BROWSER DEVELOPER TOOLS ALTERNATIVE

### Manual Network Analysis Process

If Postman setup is not immediately available, use browser Developer Tools:

#### Step 1: Open Developer Tools

1. Open Chrome/Firefox
2. Navigate to https://www.saucedemo.com/v1/
3. Press F12 or right-click → Inspect
4. Go to Network tab

#### Step 2: Record Network Activity

1. Clear network log
2. Perform login action
3. Observe network requests:
   - **POST** request to base URL
   - **Response** with redirect
   - **Cookies** set in response

#### Step 3: Analyze Form Submissions

1. Navigate to checkout
2. Submit forms with valid/invalid data
3. Monitor:
   - Request payload
   - Response status
   - Error handling

#### Step 4: Document Findings

Record observations for each scenario:

- Request methods and URLs
- Response status codes
- Error messages
- Performance metrics

---

## EXPECTED RESULTS PLACEHOLDER

### Authentication Flow Results

```
[TO BE COMPLETED AFTER POSTMAN SETUP]

Login Form Submission:
- Request Method: POST to /
- Response Status: [RECORD ACTUAL]
- Response Time: [RECORD ACTUAL]
- Cookies Set: [RECORD ACTUAL]

Invalid Login Response:
- Response Status: [RECORD ACTUAL]
- Error Message: [RECORD ACTUAL]
- Redirect Behavior: [RECORD ACTUAL]
```

### Form Validation Results

```
[TO BE COMPLETED AFTER EXECUTION]

Checkout Form Submission:
- Request Method: [RECORD ACTUAL]
- Response Status: [RECORD ACTUAL]
- Form Data Format: [RECORD ACTUAL]
- Validation Behavior: [RECORD ACTUAL]
```

### Performance Metrics

```
[TO BE COMPLETED AFTER EXECUTION]

Page Load Performance:
- Average Response Time: [RECORD ACTUAL]
- Resource Count: [RECORD ACTUAL]
- Total Page Size: [RECORD ACTUAL]
- Cache Effectiveness: [RECORD ACTUAL]
```

---

## EXECUTION CHECKLIST

### Pre-Execution Setup

- [ ] Postman installed and configured
- [ ] Collection created with proper structure
- [ ] Environment variables configured
- [ ] Test data prepared

### Execution Process

- [ ] Execute each scenario in sequence
- [ ] Record all network observations
- [ ] Document response times and status codes
- [ ] Capture screenshots of network traffic
- [ ] Validate error handling behaviors

### Post-Execution Documentation

- [ ] Update results in placeholder sections
- [ ] Create summary report of findings
- [ ] Document any issues or anomalies
- [ ] Prepare recommendations for improvements

---

## CONCLUSION

This Postman Network Analysis Collection provides comprehensive coverage of network-level testing for the Sauce Demo platform. The collection focuses on:

✅ **Form Submission Validation:** Proper data transmission and processing  
✅ **Authentication Flow Analysis:** Session management and security  
✅ **Performance Monitoring:** Response times and resource loading  
✅ **Error Handling Validation:** Appropriate error responses

**NEXT STEPS FOR YOU:**

1. **Install Postman** and set up the collection as described
2. **Execute each scenario** and record the actual results
3. **Update the placeholder sections** with real data
4. **Document any issues** found during network analysis
5. **Create summary report** of network analysis findings

---

**Document Control:**

- **Author:** Senior QA Engineer
- **Creation Date:** August 2, 2025
- **Collection Scenarios:** 10 network test scenarios
- **Setup Required:** Manual Postman configuration
- **Execution Status:** Ready for manual execution

---

_This document provides the framework for comprehensive network analysis. Please follow the setup instructions to execute the collection and update the results sections with actual findings._
