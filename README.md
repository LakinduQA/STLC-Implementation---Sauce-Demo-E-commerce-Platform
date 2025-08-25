# IEEE YP 2025 STLC Project - E-commerce Testing Automation Framework

A comprehensive Software Testing Life Cycle (STLC) project demonstrating professional test automation practices using Playwright for the Sauce Demo e-commerce platform. This project follows the complete 6-phase STLC methodology with 37 automated test cases covering end-to-end user journeys.

## Project Overview

This project was developed as part of the IEEE YP 2025 initiative to demonstrate industry-standard software testing practices. It includes complete STLC documentation, automated test framework implementation, and comprehensive test execution results.

### Application Under Test

- **Platform**: [Sauce Demo E-commerce](https://www.saucedemo.com/v1/)
- **Domain**: E-commerce web application
- **Test Coverage**: Authentication, Product Catalog, Shopping Cart, Checkout Process, End-to-End User Journeys

## Project Statistics

- **Total Test Cases**: 37 automated tests
- **Test Modules**: 5 (Authentication, Inventory, Cart, Checkout, E2E)
- **Framework**: Playwright with JavaScript
- **Architecture**: Page Object Model (POM)
- **Test Success Rate**: ✅ 100% (37/37 passing)
- **Execution Time**: 4.6 minutes
- **Documentation**: 25+ professional documents across 6 STLC phases

## Project Structure

```
IEEE YP 2025 STLC Project/
├── STLC_Project_Execution/
│   ├── Phase1_Requirements_Analysis/
│   │   ├── Business_Requirements_Document.md
│   │   ├── Functional_Requirements_Specification.md
│   │   └── Requirements_Analysis_Report.md
│   ├── Phase2_Test_Planning/
│   │   ├── Master_Test_Plan.md
│   │   ├── Test_Strategy_Document.md
│   │   └── Test_Environment_Setup_Guide.md
│   ├── Phase3_Test_Case_Design/
│   │   ├── Automation_Framework_Architecture.md
│   │   ├── Comprehensive_Test_Case_Repository.md
│   │   ├── Test_Data_Implementation_Guide.md
│   │   └── Requirements_Traceability_Matrix.md
│   ├── Phase4_Test_Implementation/
│   │   ├── Phase4_Completion_Report.md
│   │   └── Test_Implementation_Guide.md
│   ├── Phase5_Test_Execution/
│   │   ├── Test_Execution_Results.md
│   │   ├── Performance_Analysis_Report.md
│   │   └── Phase5_Completion_Report.md
│   ├── Phase6_Test_Closure/
│   │   └── Test_Closure_Report.md
│   └── Automation_Framework/
│       ├── tests/
│       │   ├── auth/login.test.js
│       │   ├── inventory/products.test.js
│       │   ├── cart/shopping-cart.test.js
│       │   ├── checkout/checkout-process.test.js
│       │   └── e2e/user-journey.test.js
│       ├── pages/
│       │   ├── LoginPage.js
│       │   ├── InventoryPage.js
│       │   ├── CartPage.js
│       │   └── CheckoutPage.js
│       ├── utils/
│       │   ├── TestData.js
│       │   └── TestUtils.js
│       ├── playwright.config.js
│       └── package.json
├── logs/
├── screenshots/
├── test-results/
└── README.md
```

## STLC Methodology - 6 Phase Implementation

### Phase 1: Requirements Analysis

- Business Requirements Document
- Functional Requirements Specification
- Requirements Analysis Report
- Stakeholder requirement validation

### Phase 2: Test Planning

- Master Test Plan creation
- Test Strategy definition
- Test Environment Setup Guide
- Resource allocation and timeline planning

### Phase 3: Test Case Design

- Comprehensive Test Case Repository (37 test cases)
- Automation Framework Architecture design
- Test Data Implementation Guide
- Requirements Traceability Matrix

### Phase 4: Test Implementation

- Playwright automation framework setup
- Page Object Model implementation
- Test script development and validation
- Test environment configuration

### Phase 5: Test Execution

- Automated test execution across multiple browsers
- Performance analysis and optimization
- Test results documentation and reporting
- Defect tracking and resolution

### Phase 6: Test Closure

- Test closure report compilation
- Project metrics and lessons learned
- Final deliverables handover
- Knowledge transfer documentation

## Test Framework Architecture

### Framework Features

- **Page Object Model**: Maintainable and scalable test architecture
- **Cross-Browser Testing**: Chrome, Firefox, Edge, Safari support
- **Parallel Execution**: Multi-worker test execution
- **Rich Reporting**: HTML reports with screenshots and videos
- **CI/CD Ready**: GitHub Actions integration support
- **Data-Driven Testing**: Configurable test data management

### Technology Stack

- **Test Runner**: Playwright Test
- **Language**: JavaScript/Node.js
- **Architecture Pattern**: Page Object Model
- **Reporting**: Playwright HTML Reporter
- **Version Control**: Git
- **Package Management**: npm

## Test Coverage

| Module           | Test Count | Status      | Coverage                             |
| ---------------- | ---------- | ----------- | ------------------------------------ |
| Authentication   | 8          | ✅ Passing  | Login/Logout scenarios               |
| Product Catalog  | 9          | ✅ Passing  | Product browsing, sorting, filtering |
| Shopping Cart    | 7          | ✅ Passing  | Add/remove items, cart management    |
| Checkout Process | 8          | ✅ Passing  | Complete purchase workflow           |
| End-to-End       | 5          | ✅ Passing  | Full user journey validation         |
| **Total**        | **37**     | **✅ 100%** | **Complete functional coverage**     |

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Git installed
- Modern web browser (Chrome, Firefox, Edge)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/lakinduqa/STLC-Implementation---Sauce-Demo-E-commerce-Platform.git
cd "STLC-Implementation---Sauce-Demo-E-commerce-Platform"
```

2. **Navigate to automation framework**

```bash
cd "STLC_Project_Execution/Automation_Framework"
```

3. **Install dependencies**

```bash
npm install
```

4. **Install Playwright browsers**

```bash
npx playwright install
```

### Running Tests

#### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests with browser UI visible
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with Playwright UI
npm run test:ui
```

#### Module-Specific Tests

```bash
# Authentication tests
npm run test:login

# Product catalog tests
npm run test:inventory

# Shopping cart tests
npm run test:cart

# Checkout process tests
npm run test:checkout

# End-to-end tests
npm run test:e2e
```

#### Browser-Specific Tests

```bash
# Chrome only
npm run test:chromium

# Firefox only
npm run test:firefox

# Safari only
npm run test:webkit

# Mobile browsers
npm run test:mobile
```

#### Test Execution Options

```bash
# Run tests in parallel (4 workers)
npm run test:parallel

# Run tests serially (1 worker)
npm run test:serial

# Generate and open test report
npm run report

# View test traces
npm run trace
```

### Test Results and Reporting

After test execution, reports are generated in:

- **HTML Report**: `playwright-report/index.html`
- **JSON Report**: `test-results/results.json`
- **JUnit Report**: `test-results/results.xml`

View the HTML report:

```bash
npm run report
```

## Configuration

### Playwright Configuration

The framework is configured via `playwright.config.js` with:

- Multi-browser support (Chrome, Firefox, Edge, Safari)
- Mobile device simulation
- Video recording on failure
- Screenshot capture
- Parallel execution settings
- Custom timeout configurations

### Test Data Management

Test data is centralized in `utils/TestData.js` including:

- User credentials
- Product information
- Customer data
- Expected results validation

### Environment Configuration

Environment-specific settings via `.env` files:

- Base URLs
- Timeout configurations
- Browser preferences
- Report settings

## Documentation

### STLC Documentation

Comprehensive documentation is available for each STLC phase:

- **Phase 1**: Requirements analysis and business documentation
- **Phase 2**: Test planning and strategy documents
- **Phase 3**: Test case design and framework architecture
- **Phase 4**: Implementation guides and setup instructions
- **Phase 5**: Execution results and performance analysis
- **Phase 6**: Closure report and project summary

### Technical Documentation

- Automation Framework Architecture
- Test Data Implementation Guide
- Requirements Traceability Matrix
- Performance Analysis Report

## Performance Metrics

- **Total Execution Time**: 4.6 minutes
- **Average Test Duration**: 7.4 seconds per test
- **Framework Efficiency**: 850% improvement over manual testing
- **Cross-Browser Compatibility**: 100% Chrome/Edge, Functional Firefox
- **Test Stability**: 100% consistent pass rate

## Best Practices Implemented

### Code Quality

- ESLint configuration for code standards
- Prettier for code formatting
- Page Object Model for maintainability
- Modular test architecture
- Comprehensive error handling

### Test Design

- Independent and isolated tests
- Data-driven test approach
- Proper test documentation
- Clear assertion messages
- Robust wait strategies

### Reporting and Monitoring

- Detailed HTML reports with screenshots
- Video recording for failed tests
- Performance metrics tracking
- Test execution logs
- CI/CD integration ready

## Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Implement changes following coding standards
4. Run tests to ensure functionality
5. Update documentation as needed
6. Submit pull request

### Coding Standards

- Follow ESLint and Prettier configurations
- Maintain Page Object Model pattern
- Include comprehensive test documentation
- Ensure cross-browser compatibility
- Add appropriate test coverage

## CI/CD Integration

The framework is designed for easy CI/CD integration:

- GitHub Actions workflow support
- Docker containerization ready
- Multiple reporting formats
- Parallel execution capability
- Environment-specific configurations

## Troubleshooting

### Common Issues

**Test execution fails**

- Ensure you're in the correct directory (`Automation_Framework/`)
- Verify all dependencies are installed: `npm install`
- Install browsers: `npx playwright install`

**Browser launch issues**

- Install browser dependencies: `npx playwright install-deps`
- Check system requirements for Playwright

**Configuration errors**

- Verify `playwright.config.js` is present
- Check environment variables and settings
- Ensure test data files are accessible

### Support

For technical issues or questions:

1. Check the troubleshooting documentation
2. Review test execution logs
3. Consult Playwright official documentation
4. Review STLC phase documentation

## Project Team

**IEEE YP STLC Project Team**

- Project implementation following industry best practices
- Comprehensive STLC methodology demonstration
- Professional automation framework development

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- IEEE Young Professionals organization
- Sauce Demo platform for providing test application
- Playwright team for excellent automation framework
- Open source community for testing best practices

---

**Project Status**: ✅ Successfully Completed  
**Documentation**: Complete across all 6 STLC phases  
**Test Framework**: Production-ready with 100% test success rate  
**Last Updated**: August 25, 2025
