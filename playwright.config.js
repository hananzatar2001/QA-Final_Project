/*
// playwright.config.js
// playwright.config.js
module.exports = {
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'firefox', use: { browserName: 'firefox' } },
    ],
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
    },
};
*/

// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    timeout: 120000,
    use: {
        baseURL: 'https://www.saucedemo.com/',
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'firefox', use: { browserName: 'firefox' } }
    ],
    reporter: [['html'], ['list']],
});
