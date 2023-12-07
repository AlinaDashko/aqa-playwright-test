import { test } from "../../../src/fixtures/userGaragePage.js"
import { expect } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../../src/data/dict/models.js";
import { USERS } from "../../../src/data/dict/users.js";
import { APIClient } from "../../../src/client/APIClient.js";
import { CreateCarModel} from "../../../src/models/cars/postCarsModel.js";

test.describe("API POST Tests", () => {
    let client;

    test.beforeAll(async () => {
        client = await APIClient.authenticate(undefined, {
            "email": USERS.ALASKA_YOUNG.email,
            "password": USERS.ALASKA_YOUNG.password,
            "remember": false
        });

        test("POST /cars Should create a new car", async ({}) => {
            const carModel = new CreateCarModel({carBrandId: 5, carModelId: 5, mileage: 122})
            const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand) => brand.id === carModel.carBrandId)
            const model = VALID_BRAND_MODELS[brand.id].data.find((model) => model.id === carModel.carModelId)
            const response = await client.cars.createUserCar(carModel)
            const expectedBody = {
                ...carModel,
                initialMileage: carModel.mileage,
                id: expect.any(Number),
                carCreatedAt: expect.any(String),
                updatedMileageAt: expect.any(String),
                brand: brand.title,
                model: model.title,
                logo: brand.logoFilename
            }
            expect(response.data.data, "Should create a new car").toEqual(expectedBody)
        });
    });
});