import {test} from "../../../src/fixtures/userGaragePage.js"
import { expect } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../../src/data/dict/models.js";
import { USERS } from "../../../src/data/dict/users.js";
import { APIClient } from "../../../src/client/APIClient.js";

test.describe("API DELETE Tests", () => {
    let client;
    let carId;

    test.beforeAll(async () => {
        client = await APIClient.authenticate(undefined, {
            "email": USERS.ALASKA_YOUNG.email,
            "password": USERS.ALASKA_YOUNG.password,
            "remember": false
        });
        
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id;
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id;
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        };
        
        const newCar = await client.cars.createUserCar(requestBody);
        carId = newCar.data.data.id;
    });

    test('DELETE /car Should delete user car', async ({}) => {
        const response = await client.cars.deleteCar(carId);
        expect(response.status, "Status code should be 200").toEqual(200);
        expect(response.data.status, "Should delete user car").toBe("ok");
    });

    test.afterAll(async ()=>{
        for (const id of carsIdsToDelete) {
            await client.cars.deleteCar(id)
        }
    });
});