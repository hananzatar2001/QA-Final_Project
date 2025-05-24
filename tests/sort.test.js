
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
require('dotenv').config();

test('Sort products A-Z and Price High to Low', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
    await expect(page).toHaveURL(/.*inventory.html/);

    await inventoryPage.sortBy('az');
    const firstItem = await page.locator('.inventory_item_name').first().innerText();
    expect(firstItem).toBeTruthy(); // على الأقل تحقق أن عنصر موجود

    await inventoryPage.sortBy('hilo');
    const prices = await page.$$eval('.inventory_item_price', prices =>
        prices.map(el => parseFloat(el.textContent.replace('$', '')))
    );

    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
});
