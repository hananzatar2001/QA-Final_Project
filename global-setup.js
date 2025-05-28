const { chromium } = require('@playwright/test');
require('dotenv').config();
const fs = require('fs');

module.exports = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', process.env.SAUCE_USERNAME);
  await page.fill('#password', process.env.SAUCE_PASSWORD);
  await page.click('#login-button');

  await page.waitForURL('**/inventory.html');

  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
};
