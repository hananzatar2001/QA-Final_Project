/*
exports.InventoryPage = class InventoryPage {
    constructor(page) {
        this.page = page;
        this.sortDropdown = page.locator('.product_sort_container');
    }

    async addItemToCart(itemName) {
        const idMap = {
            'Sauce Labs Backpack': 'add-to-cart-sauce-labs-backpack',
            'Sauce Labs Bike Light': 'add-to-cart-sauce-labs-bike-light',
        };
        const buttonId = idMap[itemName];
        if (!buttonId) throw new Error(`No add-to-cart button found for item: ${itemName}`);
        await this.page.locator(`[data-test="${buttonId}"]`).click();
    }

    async sortBy(value) {
        await this.sortDropdown.selectOption(value);
    }

    async goToCart() {
        await this.page.locator('.shopping_cart_link').click();
    }
};*/
// pages/InventoryPage.js

class InventoryPage {
    constructor(page) {
        this.page = page;
        this.sortDropdown = page.locator('.product_sort_container');
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    async addItemToCart(itemName) {
        const idMap = {
            'Sauce Labs Backpack': 'add-to-cart-sauce-labs-backpack',
            'Sauce Labs Bike Light': 'add-to-cart-sauce-labs-bike-light',
            'Sauce Labs Bolt T-Shirt': 'add-to-cart-sauce-labs-bolt-t-shirt',
            'Sauce Labs Onesie': 'add-to-cart-sauce-labs-onesie'
        };

        const buttonId = idMap[itemName];
        if (!buttonId) throw new Error(`No add-to-cart button found for item: ${itemName}`);

        const buttonLocator = this.page.locator(`[data-test="${buttonId}"]`);
        await buttonLocator.waitFor({ timeout: 10000 }); // انتظر حتى يظهر الزر
        await buttonLocator.click();
    }

    async sortBy(value) {
        await this.sortDropdown.waitFor({ timeout: 10000 });
        await this.sortDropdown.selectOption(value);
    }

    async goToCart() {
        await this.cartIcon.waitFor({ timeout: 10000 });
        await this.cartIcon.click();
    }
}

module.exports = { InventoryPage };
