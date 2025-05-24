exports.CheckoutPage = class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    async fillDetails(first, last, zip) {
        await this.page.fill('[data-test="firstName"]', first);
        await this.page.fill('[data-test="lastName"]', last);
        await this.page.fill('[data-test="postalCode"]', zip);
        await this.page.click('[data-test="continue"]');
    }

    async finish() {
        if (!this.page.isClosed()) {
            await this.page.click('[data-test="finish"]');
        } else {
            throw new Error("Page was closed before finishing checkout");
        }
    }
};
