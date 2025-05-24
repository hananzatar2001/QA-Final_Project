const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
require('dotenv').config();

test('Add item to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();

    const item = page.locator('.inventory_item_name');
    await expect(item).toHaveText('Sauce Labs Backpack');
});
