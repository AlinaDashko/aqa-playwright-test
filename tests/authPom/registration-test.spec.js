import {faker} from "@faker-js/faker";
import {expect, test} from "@playwright/test";
import {WelcomePage} from "../../src/pageObjects/WelcomePage.js";

test.describe('User registration', ()=> {
    let page
    let welcomePage
    let signUpPopup

    test.beforeAll(async ({browser}) => {
        const context = await browser.newContext({
            viewport: {
                width: 1920,
                height: 1080
            }
        })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async () => {
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })

    test('Successful Signup', async ({page}) => {
        const signUpData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: 'aqa' + faker.internet.email(),
            password: 'Password1+',
        }

            signUpPopup = await welcomePage.openSignupPopup()
            await signUpPopup.userRegistration(signUpData)
        }
    )
});
test.describe('User registration validation', ()=> {
    let page
    let welcomePage
    let signUpPopup

    test.beforeAll(async ({browser}) => {
        const context = await browser.newContext({
            viewport: {
                width: 1920,
                height: 1080
            }
        })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async () => {
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })

    test('Should display a validation message if the field length is longer than allowed', async ({page}) => {
        const signUpData = {
            name: "A".repeat(21),
            lastName: faker.person.lastName(),
            email: 'aqa' + faker.internet.email(),
            password: 'Password1+',
            reenterPassword: 'Password1+',
        };
        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillSignupForm(signUpData)
        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signUpPopup.errorMessage, "Name has to be from 2 to 20 characters long").toHaveText('Name has to be from 2 to 20 characters long')
    });
    test('Should display a validation message if the Last Name field is invalid', async ({page}) => {
        const signUpData = {
            name: faker.person.firstName(),
            lastName: "12345",
            email: 'aqa' + faker.internet.email(),
            password: 'Password1+',
            reenterPassword: 'Password1+',
        };
        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillSignupForm(signUpData)
        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signUpPopup.errorMessage, "Validation message should be displayed if the field was invalid").toHaveText('Last name is invalid')
    });
    test('Should display a validation message if the Email field is incorrect', async ({page}) => {
        const signUpData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: "shrjerj6",
            password: 'Password1+',
            reenterPassword: 'Password1+',
        };
        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillSignupForm(signUpData)
        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signUpPopup.errorMessage, "Validation message should be displayed if the field was incorrect").toHaveText('Email is incorrect')
    });
    test('Should display a validation message if the Password field has wrong data', async ({page}) => {
        const signUpData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: 'aqa' + faker.internet.email(),
            password: '123',
            reenterPassword: 'Password1+'
        };
        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillSignupForm(signUpData)
        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signUpPopup.errorMessage, "Validation message should be displayed if the field has wrong data").toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    });
    test('Should display a validation message if the Re-enter Password field does not match', async ({page}) => {
        const signUpData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: 'aqa' + faker.internet.email(),
            password: 'Password1+',
            reenterPassword: 'test1doesnotmatch'
        };
        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillSignupForm(signUpData)
        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signUpPopup.errorMessage, "Validation message should be displayed if the field does not match").toHaveText('Passwords do not match')
    });
})
