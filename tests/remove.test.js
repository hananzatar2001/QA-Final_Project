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

  let itemsBefore = await page.$$eval('.inventory_item_name', els =>
    els.map(el => el.textContent.trim())
  );
  console.log(' Items in cart before removal:', itemsBefore);

  const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  await removeButton.waitFor({ timeout: 10000 });
  await removeButton.click();

  const cartItemsCount = await page.locator('.cart_item').count();

  if (cartItemsCount === 0) {
    console.log(' Cart is empty after removal ');
  } else {
    const itemsAfter = await page.$$eval('.inventory_item_name', els =>
      els.map(el => el.textContent.trim())
    );
    console.log(' Items remaining in cart after removal:', itemsAfter);
  }

  expect(cartItemsCount).toBe(0);
});

