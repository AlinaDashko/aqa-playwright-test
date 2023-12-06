import { test } from "../../../src/fixtures/userGaragePage.js"
import { expect } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../../src/data/dict/models.js";
import { USERS } from "../../../src/data/dict/users.js";
import { APIClient } from "../../../src/client/APIClient.js";
import { EditCarModel} from "../../../src/models/cars/putCarsModels.js";
import { CreateCarModel} from "../../../src/models/cars/postCarsModel.js";

test.describe("API PUT Tests", () => {
    let client;
    let carId;

    test.beforeAll(async () => {
        client = await APIClient.authenticate(undefined, {
            "email": USERS.ALASKA_YOUNG.email,
            "password": USERS.ALASKA_YOUNG.password,
            "remember": false
        });

        const carModel = new CreateCarModel({carBrandId: 1, carModelId: 2, mileage: 133})
        const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand) => brand.id === carModel.carBrandId)
        const model = VALID_BRAND_MODELS[brand.id].data.find((model) => model.id === carModel.carModelId)
        const newCar = await client.cars.createUserCar(carModel)
        carId = newCar.data.data.id
        let carInitialMilleage;
        carInitialMilleage = carModel.mileage
    })

    test("PUT /cars Should edit a new car", async ({}) => {
        const editedCarModel = new EditCarModel({carBrandId: 2, carModelId: 4, mileage: 122})
        const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand) => brand.id === editedCarModel.carBrandId)
        const model = VALID_BRAND_MODELS[brand.id].data.find((model) => model.id === editedCarModel.carModelId)
        const response = await client.cars.editUserCarById(carId, editedCarModel)
        const expectedBody = {
            ...editedCarModel,
            initialMileage: expect.any(Number),
            id: expect.any(Number),
            updatedMileageAt: expect.any(String),
            brand: brand.title,
            model: model.title,
            logo: brand.logoFilename
        }
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.status, "Success response should be returned").toBe("ok")
        expect(response.data.data, "Should edit a new car").toEqual(expectedBody)
    });
});