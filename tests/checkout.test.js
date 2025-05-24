
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
require('dotenv').config();

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

        await page.waitForSelector('[data-test="checkout"]');
        await page.locator('[data-test="checkout"]').click();

        await page.locator('[data-test="firstName"]').fill('John');
        await page.locator('[data-test="lastName"]').fill('Doe');
        await page.locator('[data-test="postalCode"]').fill('12345');
        await page.locator('[data-test="continue"]').click();

        await page.waitForSelector('[data-test="finish"]');
        await page.locator('[data-test="finish"]').click();

        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });
});

test.describe('Cart Feature', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('Add item to cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('.shopping_cart_link').click();

        const item = page.locator('.inventory_item_name');
        await expect(item).toHaveText('Sauce Labs Backpack');
    });

    test('Remove item from cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.goToCart();

        const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        await removeButton.waitFor({ timeout: 10000 });
        await removeButton.click();

        const cartItems = await page.locator('.cart_item').count();
        expect(cartItems).toBe(0);
    });
});

test.describe('Sort Feature', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('Sort products A-Z and Price High to Low', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.sortBy('az');
        const firstItem = await page.locator('.inventory_item_name').first().innerText();
        expect(firstItem).toBeTruthy();

        await inventoryPage.sortBy('hilo');
        const prices = await page.$$eval('.inventory_item_price', prices =>
            prices.map(el => parseFloat(el.textContent.replace('$', '')))
        );

        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);
    });
});

test.describe('Login Feature', () => {
    test('Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);

        await page.waitForSelector('.inventory_list', { timeout: 15000 });
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('Login with invalid credentials shows error', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('wrong_user', 'wrong_pass');
        await expect(loginPage.errorMessage).toBeVisible();
    });
});
