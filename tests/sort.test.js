const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
require('dotenv').config();

test.describe('Sort Feature - SauceDemo', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Sort by Name (A to Z)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('az');

    const productNames = await page.$$eval('.inventory_item_name', items =>
      items.map(el => el.textContent.trim())
    );

    const expected = [...productNames].sort((a, b) => a.localeCompare(b));

    console.log('--- A to Z ---');
    console.log('Actual   :', productNames);
    console.log('Expected :', expected);

    expect(productNames).toEqual(expected);
  });

  test('Sort by Name (Z to A)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('za');

    const productNames = await page.$$eval('.inventory_item_name', items =>
      items.map(el => el.textContent.trim())
    );

    const expected = [...productNames].sort((a, b) => b.localeCompare(a));

    console.log('--- Z to A ---');
    console.log('Actual   :', productNames);
    console.log('Expected :', expected);

    expect(productNames).toEqual(expected);
  });

  test('Sort by Price (Low to High)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('lohi');

    const prices = await page.$$eval('.inventory_item_price', items =>
      items.map(el => parseFloat(el.textContent.replace('$', '')))
    );

    const expected = [...prices].sort((a, b) => a - b);

    console.log('--- Price Low to High ---');
    console.log('Actual   :', prices);
    console.log('Expected :', expected);

    expect(prices).toEqual(expected);
  });

  test('Sort by Price (High to Low)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('hilo');

    const prices = await page.$$eval('.inventory_item_price', items =>
      items.map(el => parseFloat(el.textContent.replace('$', '')))
    );

    const expected = [...prices].sort((a, b) => b - a);

    console.log('--- Price High to Low ---');
    console.log('Actual   :', prices);
    console.log('Expected :', expected);

    expect(prices).toEqual(expected);
  });
});
