
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    timeout: 120000,
    use: {
        baseURL: 'https://www.saucedemo.com/',
        headless: false,
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
