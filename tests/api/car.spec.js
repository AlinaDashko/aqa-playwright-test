import {test} from "../../src/fixtures/userGaragePage.js"
import {expect} from "@playwright/test";
import {VALID_BRANDS_RESPONSE_BODY} from "../../src/data/dict/brands.js";
import{VALID_BRAND_MODELS} from "../../src/data/dict/models.js";

test.describe("api", ()=> {
    test("should create a new car", async ({userAPIClient}) => {
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }

        const response = await userAPIClient.post('/api/cars', {
            data: requestBody
        })
        const body = await response.json()
        await expect(response, "Positive response should be returned").toBeOK()
        expect(response.status(), "Status code should be 200").toEqual(201)
        expect(body.status).toBe("ok")
        expect(body.data, "Car should be created with data from request").toMatchObject(requestBody)
    })

    test("should return an error when creating a new car with wrong brand and model id", async ({userAPIClient}) => {

        const requestBody = {
            "carBrandId": 122,
            "carModelId": 122,
            "mileage": 122
        }

        const response = await userAPIClient.post('/api/cars', {
            data: requestBody
        })
        const body = await response.json()

        expect(response.status(), "Status code should be 404").toEqual(404)
        expect(body.status).toBe("error")
        expect(body.message).toBe("Brand not found")
    })

    test("should return an error when creating a new car without mileage", async ({userAPIClient}) => {
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
        }

        const response = await userAPIClient.post('/api/cars', {
            data: requestBody
        })
        const body = await response.json()

        expect(response.status(), "Status code should be 400").toEqual(400)
        expect(body.status).toBe("error")
        expect(body.message).toBe("Mileage is required")
    })
})