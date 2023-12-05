import { test } from "../../../src/fixtures/userGaragePage.js"
import { expect } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../../src/data/dict/models.js";
import { USERS } from "../../../src/data/dict/users.js";
import { APIClient } from "../../../src/client/APIClient.js";

test.describe("API GET Tests", () => {
    let client;
    let carId;
    let requestBody;

    test.beforeAll(async () => {
        client = await APIClient.authenticate(undefined, {
            "email": USERS.ALASKA_YOUNG.email,
            "password": USERS.ALASKA_YOUNG.password,
            "remember": false
        });

        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id
        requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }
        const newCar = await client.cars.createUserCar(requestBody)
        carId = newCar.data.data.id
    });

    test("GET /cars should return a list of cars", async () => {
        const response = await client.cars.getUserCars();
        expect(response.data.data[0], "should return a list of cars").toMatchObject(requestBody);
        expect(response.status, "Status code should be 200").toEqual(200);
    });

    test("GET /cars/{id} should return details of a specific car", async () => {
        const response = await client.cars.getUserCarById(carId);
        expect(response.data.data, "should return details of a specific car").toMatchObject(requestBody);
        expect(response.status, "Status code should be 200").toEqual(200);
    });

    test("GET /cars/brands should return a list of car brands", async () => {
        const response = await client.cars.getUserCarBrands()
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.data, "should return a list of car brands").toMatchObject(VALID_BRANDS_RESPONSE_BODY.data)

    });

        for (const brand of VALID_BRANDS_RESPONSE_BODY.data) {
            test(`Should return valid data for ${brand.title} brand`, async ({}) => {
                const brandId = brand.id
                const response = await client.cars.getUserCarBrandsById(brandId)
                expect(response.status, "Status code should be 200").toEqual(200)
                expect(response.data.data, "Valid brand data should be returned").toMatchObject(VALID_BRANDS_RESPONSE_BODY.data[brandId-1])
        })
    }

    test("GET /cars/models should return a list of car models", async () => {
        const response = await client.cars.getUserCarsModels();
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.data, "should return a list of car models").toMatchObject(VALID_BRAND_MODELS.data)
    });

        // for (const model of VALID_BRAND_MODELS.data) {
        //     test(`Should return valid data for ${model.title} model`, async ({}) => {
        //     const modelId = model.id
        //     const response = await client.cars.getUserCarModelsById(modelId)
        //     expect(response.status, "Status code should be 200").toEqual(200)
        //     expect(response.data.data, "should return a list of car models").toMatchObject(VALID_BRAND_MODELS.data[modelId-1])
        // });
    })
