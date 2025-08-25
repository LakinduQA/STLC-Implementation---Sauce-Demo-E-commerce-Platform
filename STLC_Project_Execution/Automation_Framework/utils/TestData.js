/**
 * Test Data Configuration - All test data for automation tests
 * Sauce Demo STLC Project - IEEE YP 2025
 */

class TestData {
    static get users() {
        return {
            standard: {
                username: 'standard_user',
                password: 'secret_sauce',
                description: 'Standard user with normal behavior'
            },
            lockedOut: {
                username: 'locked_out_user',
                password: 'secret_sauce',
                description: 'User that has been locked out'
            },
            problem: {
                username: 'problem_user',
                password: 'secret_sauce',
                description: 'User with problematic behavior'
            },
            performanceGlitch: {
                username: 'performance_glitch_user',
                password: 'secret_sauce',
                description: 'User with performance issues'
            },
            invalid: {
                username: 'invalid_user',
                password: 'wrong_password',
                description: 'Invalid credentials for negative testing'
            }
        };
    }

    static get products() {
        return {
            backpack: {
                name: 'Sauce Labs Backpack',
                price: '$29.99',
                description: 'carry.allTheThings() with the sleek, streamlined Sly Pack'
            },
            bikeLight: {
                name: 'Sauce Labs Bike Light',
                price: '$9.99',
                description: 'A red light isn\'t the desired state in testing'
            },
            boltTshirt: {
                name: 'Sauce Labs Bolt T-Shirt',
                price: '$15.99',
                description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt'
            },
            fleeceJacket: {
                name: 'Sauce Labs Fleece Jacket',
                price: '$49.99',
                description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket'
            },
            onesie: {
                name: 'Sauce Labs Onesie',
                price: '$7.99',
                description: 'Rib snap infant onesie for the junior automation engineer'
            },
            redTshirt: {
                name: 'Test.allTheThings() T-Shirt (Red)',
                price: '$15.99',
                description: 'This classic Sauce Labs t-shirt is perfect to wear'
            }
        };
    }

    static get sortOptions() {
        return {
            nameAZ: { value: 'az', description: 'Name (A to Z)' },
            nameZA: { value: 'za', description: 'Name (Z to A)' },
            priceLowHigh: { value: 'lohi', description: 'Price (low to high)' },
            priceHighLow: { value: 'hilo', description: 'Price (high to low)' }
        };
    }

    static get customerInfo() {
        return {
            valid: {
                firstName: 'John',
                lastName: 'Doe',
                postalCode: '12345'
            },
            minimal: {
                firstName: 'Jane',
                lastName: 'Smith',
                postalCode: '54321'
            },
            international: {
                firstName: 'José',
                lastName: 'García',
                postalCode: 'M1A 1A1'
            }
        };
    }

    static get errorMessages() {
        return {
            lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
            invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
            emptyUsername: 'Epic sadface: Username is required',
            emptyPassword: 'Epic sadface: Password is required',
            emptyFirstName: 'Error: First Name is required',
            emptyLastName: 'Error: Last Name is required',
            emptyPostalCode: 'Error: Postal Code is required'
        };
    }

    static get urls() {
        return {
            base: 'https://www.saucedemo.com/v1/',
            login: 'https://www.saucedemo.com/v1/',
            inventory: 'https://www.saucedemo.com/v1/inventory.html',
            cart: 'https://www.saucedemo.com/v1/cart.html',
            checkoutStepOne: 'https://www.saucedemo.com/v1/checkout-step-one.html',
            checkoutStepTwo: 'https://www.saucedemo.com/v1/checkout-step-two.html',
            checkoutComplete: 'https://www.saucedemo.com/v1/checkout-complete.html'
        };
    }

    static get expectedProductOrder() {
        return {
            nameAZ: [
                'Sauce Labs Backpack',
                'Sauce Labs Bike Light',
                'Sauce Labs Bolt T-Shirt',
                'Sauce Labs Fleece Jacket',
                'Sauce Labs Onesie',
                'Test.allTheThings() T-Shirt (Red)'
            ],
            nameZA: [
                'Test.allTheThings() T-Shirt (Red)',
                'Sauce Labs Onesie',
                'Sauce Labs Fleece Jacket',
                'Sauce Labs Bolt T-Shirt',
                'Sauce Labs Bike Light',
                'Sauce Labs Backpack'
            ],
            priceLowHigh: [
                'Sauce Labs Onesie',           // $7.99
                'Sauce Labs Bike Light',       // $9.99
                'Sauce Labs Bolt T-Shirt',     // $15.99
                'Test.allTheThings() T-Shirt (Red)', // $15.99
                'Sauce Labs Backpack',         // $29.99
                'Sauce Labs Fleece Jacket'     // $49.99
            ],
            priceHighLow: [
                'Sauce Labs Fleece Jacket',    // $49.99
                'Sauce Labs Backpack',         // $29.99
                'Test.allTheThings() T-Shirt (Red)', // $15.99
                'Sauce Labs Bolt T-Shirt',     // $15.99
                'Sauce Labs Bike Light',       // $9.99
                'Sauce Labs Onesie'            // $7.99
            ]
        };
    }

    static get testConfiguration() {
        return {
            timeout: {
                short: 5000,
                medium: 10000,
                long: 30000
            },
            retries: 2,
            screenshotOnFailure: true,
            videoOnFailure: true
        };
    }

    /**
     * Get a random valid user
     * @returns {Object} Random user credentials
     */
    static getRandomValidUser() {
        const validUsers = [this.users.standard, this.users.problem, this.users.performanceGlitch];
        const randomIndex = Math.floor(Math.random() * validUsers.length);
        return validUsers[randomIndex];
    }

    /**
     * Get a random product
     * @returns {Object} Random product data
     */
    static getRandomProduct() {
        const products = Object.values(this.products);
        const randomIndex = Math.floor(Math.random() * products.length);
        return products[randomIndex];
    }

    /**
     * Get multiple random products
     * @param {number} count - Number of products to return
     * @returns {Array} Array of random products
     */
    static getRandomProducts(count = 2) {
        const products = Object.values(this.products);
        const shuffled = products.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, products.length));
    }

    /**
     * Get test customer info by type
     * @param {string} type - Type of customer info (valid, minimal, international)
     * @returns {Object} Customer information
     */
    static getCustomerInfo(type = 'valid') {
        return this.customerInfo[type] || this.customerInfo.valid;
    }

    /**
     * Generate invalid test data
     * @returns {Object} Invalid test data combinations
     */
    static getInvalidTestData() {
        return {
            emptyFields: {
                firstName: '',
                lastName: '',
                postalCode: ''
            },
            specialCharacters: {
                firstName: '!@#$%',
                lastName: '^&*()',
                postalCode: '<>?/'
            },
            longStrings: {
                firstName: 'a'.repeat(100),
                lastName: 'b'.repeat(100),
                postalCode: 'c'.repeat(100)
            }
        };
    }
}

module.exports = TestData;
