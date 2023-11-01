// @ts-check
import { test, expect } from "@playwright/test";

test.beforeAll(async ()=>{
  //
})

//describe
test.describe("Test", ()=>{
  // it

  test.beforeAll(async ()=>{
    //
  })

  test.beforeEach(async ()=>{
    //
  })

  test.afterEach(async ()=>{
    //
  })

  test.afterAll(async ()=>{
    //
  })

  test('has title 1 @smoke', async ({page}) => {

    await test.step("Navigate to playwright site", async ()=>{
      await page.goto('https://playwright.dev/');
    })

    await test.step("Check page title", async ()=>{
      await expect(page).toHaveTitle(/Playwright/);
    })

  });

  test('has title 2', async ({page}) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async ({page}) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', {name: 'Get started'}).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', {name: 'Installation'})).toBeVisible();
  });
})
