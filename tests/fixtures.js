/*
// tests/fixtures.js
const { testasbase } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

exports.test = base.extend({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await page.goto(process.env.BASE_URL || 'https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
        await use(page);
    },
});
*/
