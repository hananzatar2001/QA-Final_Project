const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
require('dotenv').config();

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

  const items = await page.$$eval('.inventory_item_name', els =>
    els.map(el => el.textContent.trim())
  );

  console.log(' Products in cart:', items);

  expect(items).toContain('Sauce Labs Backpack');
});
//
  test('Remove item from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await removeButton.waitFor({ timeout: 10000 });
    await removeButton.click();

    const cartItems = await page.locator('.cart_item').count();

    if (cartItems === 0) {
      console.log('Cart is empty after removal ');
    } else {
      const items = await page.$$eval('.inventory_item_name', elements =>
        elements.map(el => el.textContent.trim())
      );
      console.log(' Items remaining in cart:', items);
    }

    expect(cartItems).toBe(0);
  });
});
