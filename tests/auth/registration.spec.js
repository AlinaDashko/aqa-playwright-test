import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test.describe("User registration", () => {
    test("Create user", async ({ page }) => {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: 'aqa' + faker.internet.email(),
            password: 'Password1+',
        };

        await page.goto('/');
        const signUpButton = page.locator('button.hero-descriptor_btn');
        await expect(signUpButton, "Sign Up button should be visible").toBeVisible();
        await expect(signUpButton, "Sign Up button should be enabled").toBeEnabled();
        await signUpButton.click();

        const popup = page.locator('app-signup-modal');
        await expect(popup, "Registration popup should be visible").toBeVisible();

        const firstNameInput = popup.locator('input#signupName');
        const lastNameInput = popup.locator('input#signupLastName');
        const emailInput = popup.locator('input#signupEmail');
        const passwordInput = popup.locator('input#signupPassword');
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword');
        const registerButton = popup.locator('button.btn.btn-primary');

        await firstNameInput.fill(user.firstName);
        await lastNameInput.fill(user.lastName);
        await emailInput.fill(user.email);
        await passwordInput.fill(user.password);
        await repeatPasswordInput.fill(user.password);
        await expect(registerButton, "Register button should be visible").toBeVisible();
        await expect(registerButton, "Register button should be enabled").toBeEnabled();
        await registerButton.click();

        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });
});
test.describe("User registration validation", () => {
    test("Should display a validation message if the field length is longer than allowed", async ({page}) => {
        const user = {
            firstName: "A".repeat(21),
            lastName: faker.person.lastName(),
            email: 'aqa' + faker.internet.email(),
            password: 'Password1+',
        };
        await page.goto('/');

        const signUpButton = page.locator('button.hero-descriptor_btn');
        await expect(signUpButton, "Sign Up button should be visible").toBeVisible();
        await expect(signUpButton, "Sign Up button should be enabled").toBeEnabled();
        await signUpButton.click();

        const popup = page.locator('app-signup-modal');
        await expect(popup, "Registration popup should be visible").toBeVisible();
        const firstNameInput = popup.locator('input#signupName');
        const lastNameInput = popup.locator('input#signupLastName');
        const emailInput = popup.locator('input#signupEmail');
        const passwordInput = popup.locator('input#signupPassword');
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword');
        const registerButton = popup.locator('button.btn.btn-primary');

        await firstNameInput.fill(user.firstName);
        await lastNameInput.fill(user.lastName);
        await emailInput.fill(user.email);
        await passwordInput.fill(user.password);
        await repeatPasswordInput.fill(user.password);
        await expect(registerButton, "Register button should be visible").toBeVisible();
        await expect(registerButton, "Register button should be disabled").toBeDisabled();

        const firstNameValidationMessage = popup.locator('div.invalid-feedback');
        await expect(firstNameValidationMessage, "Name has to be from 2 to 20 characters long").toHaveText('Name has to be from 2 to 20 characters long');
        await expect(firstNameInput, "Red border should appear if the field length is longer than allowed").toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test("Should display a validation message if the Last Name field is invalid", async ({page}) => {
        const user = {
            firstName: faker.person.firstName(),
            lastName: "12345",
            email: 'aqa' + faker.internet.email(),
            password: 'Password1+',
        };
        await page.goto('/');

        const signUpButton = page.locator('button.hero-descriptor_btn');
        await expect(signUpButton, "Sign Up button should be visible").toBeVisible();
        await expect(signUpButton, "Sign Up button should be enabled").toBeEnabled();
        await signUpButton.click();

        const popup = page.locator('app-signup-modal');
        await expect(popup, "Registration popup should be visible").toBeVisible();
        const firstNameInput = popup.locator('input#signupName');
        const lastNameInput = popup.locator('input#signupLastName');
        const emailInput = popup.locator('input#signupEmail');
        const passwordInput = popup.locator('input#signupPassword');
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword');
        const registerButton = popup.locator('button.btn.btn-primary');

        await firstNameInput.fill(user.firstName);
        await lastNameInput.fill(user.lastName);
        await emailInput.fill(user.email);
        await passwordInput.fill(user.password);
        await repeatPasswordInput.fill(user.password);
        await expect(registerButton, "Register button should be visible").toBeVisible();
        await expect(registerButton, "Register button should be disabled").toBeDisabled();

        const lastNameValidationMessage = popup.locator('div.invalid-feedback');
        await expect(lastNameValidationMessage, "Validation message should be displayed if the field was invalid").toHaveText('Last name is invalid');
    });

    test("Should display a validation message if the Email field is incorrect", async ({page}) => {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: "shrjerj6",
            password: 'Password1+',
        };
        await page.goto('/');

        const signUpButton = page.locator('button.hero-descriptor_btn');
        await expect(signUpButton, "Sign Up button should be visible").toBeVisible();
        await expect(signUpButton, "Sign Up button should be enabled").toBeEnabled();
        await signUpButton.click();

        const popup = page.locator('app-signup-modal');
        await expect(popup, "Registration popup should be visible").toBeVisible();
        const firstNameInput = popup.locator('input#signupName');
        const lastNameInput = popup.locator('input#signupLastName');
        const emailInput = popup.locator('input#signupEmail');
        const passwordInput = popup.locator('input#signupPassword');
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword');
        const registerButton = popup.locator('button.btn.btn-primary');

        await firstNameInput.fill(user.firstName);
        await lastNameInput.fill(user.lastName);
        await emailInput.fill(user.email);
        await passwordInput.fill(user.password);
        await repeatPasswordInput.fill(user.password);
        await expect(registerButton, "Register button should be visible").toBeVisible();
        await expect(registerButton, "Register button should be disabled").toBeDisabled();

        const emailValidationMessage = popup.locator('div.invalid-feedback');
        await expect(emailValidationMessage, "Validation message should be displayed if the field was incorrect").toHaveText('Email is incorrect');
    });

    test("Should display a validation message if the Password field has wrong data", async ({page}) => {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: 'aqa' + faker.internet.email(),
            password: '123',
        };
        await page.goto('/');

        const signUpButton = page.locator('button.hero-descriptor_btn');
        await expect(signUpButton, "Sign Up button should be visible").toBeVisible();
        await expect(signUpButton, "Sign Up button should be enabled").toBeEnabled();
        await signUpButton.click();

        const popup = page.locator('app-signup-modal');
        await expect(popup, "Registration popup should be visible").toBeVisible();
        const firstNameInput = popup.locator('input#signupName');
        const lastNameInput = popup.locator('input#signupLastName');
        const emailInput = popup.locator('input#signupEmail');
        const passwordInput = popup.locator('input#signupPassword');
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword');
        const registerButton = popup.locator('button.btn.btn-primary');

        await firstNameInput.fill(user.firstName);
        await lastNameInput.fill(user.lastName);
        await emailInput.fill(user.email);
        await passwordInput.fill(user.password);
        await repeatPasswordInput.fill(user.password);
        await expect(registerButton, "Register button should be visible").toBeVisible();
        await expect(registerButton, "Register button should be disabled").toBeDisabled();

        const passwordValidationMessage = popup.locator('div.invalid-feedback');
        await expect(passwordValidationMessage, "Validation message should be displayed if the field has wrong data").toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test("Should display a validation message if the Re-enter Password field does not match", async ({page}) => {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: 'aqa' + faker.internet.email(),
            password: 'Password1+',
            reenterPassword: 'test1doesnotmatch'
        };
        await page.goto('/');

        const signUpButton = page.locator('button.hero-descriptor_btn');
        await expect(signUpButton, "Sign Up button should be visible").toBeVisible();
        await expect(signUpButton, "Sign Up button should be enabled").toBeEnabled();
        await signUpButton.click();

        const popup = page.locator('app-signup-modal');
        await expect(popup, "Registration popup should be visible").toBeVisible();
        const firstNameInput = popup.locator('input#signupName');
        const lastNameInput = popup.locator('input#signupLastName');
        const emailInput = popup.locator('input#signupEmail');
        const passwordInput = popup.locator('input#signupPassword');
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword');
        const registerButton = popup.locator('button.btn.btn-primary');

        await firstNameInput.fill(user.firstName);
        await lastNameInput.fill(user.lastName);
        await emailInput.fill(user.email);
        await passwordInput.fill(user.password);
        await repeatPasswordInput.fill(user.password);
        await expect(registerButton, "Register button should be visible").toBeVisible();
        await expect(registerButton, "Register button should be disabled").toBeDisabled();

        const reEnterPasswordValidationMessage = popup.locator('div.invalid-feedback');
        await expect(reEnterPasswordValidationMessage, "Validation message should be displayed if the field does not match").toHaveText('Passwords do not match');
    });
});






