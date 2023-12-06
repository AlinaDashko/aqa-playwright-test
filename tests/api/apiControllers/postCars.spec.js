import { test } from "../../../src/fixtures/userGaragePage.js"
import { expect } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../../src/data/dict/models.js";
import { USERS } from "../../../src/data/dict/users.js";
import { APIClient } from "../../../src/client/APIClient.js";

test.describe("API POST Tests", () => {
    let client;
    let carId;
    let requestBody;

    test.beforeAll(async () => {
        client = await APIClient.authenticate(undefined, {
            "email": USERS.ALASKA_YOUNG.email,
            "password": USERS.ALASKA_YOUNG.password,
            "remember": false
        });

    test("POST /cars Should create a new car", async ({})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[1].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id;
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }
        const response = await client.cars.createUserCar(requestBody)
        carId = response.data.data.id
        expect(response.status, "Status code should be 201").toEqual(201)
        expect(response.data.status, "Success response should be returned").toBe("ok")
        expect(response.data.data, "Car should be created with data from request").toMatchObject(requestBody)
    });
});
});