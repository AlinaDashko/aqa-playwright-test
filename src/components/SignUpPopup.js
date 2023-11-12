import {BaseComponent} from "../pageObjects/BaseComponent.js";
import {expect} from "@playwright/test";

export class SignUpPopup extends BaseComponent {

    constructor(page) {
        super(page, page.locator('div.modal-dialog'));
        this.nameInput = this._container.locator('input#signupName')
        this.lastNameInput = this._container.locator('input#signupLastName')
        this.emailInput = this._container.locator('input#signupEmail')
        this.passwordInput = this._container.locator('input#signupPassword')
        this.reenterInput = this._container.locator('input#signupRepeatPassword')
        this.registerButton = this._container.locator('.btn-primary')
        this.errorMessage = this._container.locator('.invalid-feedback')
    }

    async userRegistration({name, lastName, email, password}){
        await this.nameInput.fill(name)
        await this.lastNameInput.fill(lastName)
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.reenterInput.fill(password)
        await this.registerButton.click()
        await expect(this._page).toHaveURL('https://qauto.forstudy.space/panel/garage')
    }

    async fillSignupForm({name, lastName, email, password, reenterPassword, switchFocus}){
        await this.nameInput.fill(name)
        await this.lastNameInput.fill(lastName)
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.reenterInput.fill(reenterPassword)
        if (switchFocus) await this.reenterInput.blur()
    }

}