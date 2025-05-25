# QA-Final_Project

This is an automated testing framework for [SauceDemo.com](https://www.saucedemo.com) built using **Playwright** with **JavaScript**.  

##  Installation & Setup

1. **Install dependencies**
      ```bash
       npm install
2. **Install Playwright browsers**
   ```bash
       npx playwright install
   ```
4. **Set up environment variables**
Create a .env file with the following content:
```bash
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
```
4. **Run all tests**
   ```bash
     npx playwright test
``
6. **View test report**
 ```bash
     npx playwright show-report
```

1. Hooks
```bash
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
  await expect(page).toHaveURL(/.*inventory.html/);
});
 ```

2. Page Object Model (POM)
```bash
exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('[data-test="login-button"]');
  }
};
```

```bash
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);

 ```

3. Parameterized Test (.env)
```bash
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
```
```bash
require('dotenv').config();
await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);

 ```

 4. Grouping
```bash
test.describe('Cart Feature', () => {
  test('Add item to cart', async ({ page }) => { ... });
  test('Remove item from cart', async ({ page }) => { ... });
});

 ```
