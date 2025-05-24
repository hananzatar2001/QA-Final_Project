
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
require('dotenv').config();

test.describe('Login Feature', () => {
    test('Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        // تأكد من تحميل الصفحة
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        console.log('Using USERNAME:', process.env.USERNAME);
        console.log('Using PASSWORD:', process.env.PASSWORD);

        await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);

        // إضافة انتظار يدوي للزر بعد تسجيل الدخول
        await page.waitForSelector('.inventory_list', { timeout: 15000 });

        // تحقق من التنقل
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('Login with invalid credentials shows error', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('wrong_user', 'wrong_pass');
        await expect(loginPage.errorMessage).toBeVisible();
    });
});

