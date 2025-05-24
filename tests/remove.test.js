const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
require('dotenv').config();

test('Remove item from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
    await expect(page).toHaveURL(/.*inventory.html/);

    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await removeButton.waitFor({ timeout: 10000 });
    await removeButton.click();

    const cartItems = await page.locator('.cart_item').count();
    expect(cartItems).toBe(0);
});
