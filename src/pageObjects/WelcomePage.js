import {BasePage} from "./BasePage.js";
import {expect} from "@playwright/test";
import {SignUpPopup} from "../components/SignUpPopup.js";
import {SignInPopup} from "../components/SignInPopup.js";


export class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('button', {hasText: 'Guest log in'}));
        this.signUpButton = this._page.locator('button:text("Sign up")');
        this.signInButton = page.locator('.header_signin')
    }

    async openSignupPopup(){
        await expect(this.signUpButton, "Registration link should be visible").toBeVisible();
        await this.signUpButton.click();
        return new SignUpPopup(this._page)
    }
    async openSignInPopup (){
        await this.signInButton.click()
        return new SignInPopup(this._page)
    }
}