const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate and login
    await page.goto('https://www.saucedemo.com/v1/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    // Add item and go to checkout
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('.checkout_button');
    
    console.log('Current URL:', page.url());
    
    // Debug continue button
    const continueBtn = await page.$('input[value="CONTINUE"]');
    if (continueBtn) {
      console.log('Found continue button with input[value="CONTINUE"]');
    } else {
      console.log('Continue button not found, checking all buttons...');
      const buttons = await page.$$eval('input, button', btns => 
        btns.map(btn => ({ 
          tag: btn.tagName, 
          type: btn.type, 
          value: btn.value, 
          text: btn.textContent.trim(),
          className: btn.className,
          dataset: btn.dataset ? Object.keys(btn.dataset) : []
        }))
      );
      console.log('All buttons:', JSON.stringify(buttons, null, 2));
    }
    
    // Check form fields
    const formFields = await page.$$eval('input[type="text"], input[data-test]', inputs =>
      inputs.map(input => ({
        type: input.type,
        dataTest: input.getAttribute('data-test'),
        name: input.name,
        id: input.id,
        className: input.className
      }))
    );
    console.log('Form fields:', JSON.stringify(formFields, null, 2));
    
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.error('Error:', error);
  }
  
  await browser.close();
})();
