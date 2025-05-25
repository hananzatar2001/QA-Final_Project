exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;
    }

    async removeItem(name) {
        const idMap = {
            'Sauce Labs Backpack': 'remove-sauce-labs-backpack',
            'Sauce Labs Bike Light': 'remove-sauce-labs-bike-light',
        };
        const buttonId = idMap[name];
        if (!buttonId) throw new Error(`No remove button found for item: ${name}`);
        await this.page.locator(`[data-test="${buttonId}"]`).click();
    }
//
    async proceedToCheckout() {
        await this.page.locator('[data-test="checkout"]').click();
    }
};
