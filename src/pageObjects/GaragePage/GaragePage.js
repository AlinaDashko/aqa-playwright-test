import {BasePage} from "../BasePage.js";

export class GaragePage extends BasePage {

    constructor(page) {
        super(page, '/panel/garage', page.locator('button', {hasText: 'Add car'}));
        this.addCarButton = page.locator('button.btn.btn-primary');
    }
}