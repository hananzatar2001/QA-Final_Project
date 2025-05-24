# QA-Final_Project

This is an automated testing framework for [SauceDemo.com](https://www.saucedemo.com) built using **Playwright** with **JavaScript**.  

##  Installation & Setup

1. **Install dependencies**
```bash
npm install

2. **Install Playwright browsers**
npx playwright install

3. **Set up environment variables**
Create a .env file with the following content:

SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce

4. **Run all tests**
npx playwright test

5. **View test report**
npx playwright show-report


Sample Test: Login
test.describe('Login Feature', () => {
  test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
    await expect(page).toHaveURL(/.*inventory.html/);
  });
});

Sample Test: Checkout
test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Complete checkout', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});






