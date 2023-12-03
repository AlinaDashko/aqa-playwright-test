import { test } from "../../src/fixtures/userGaragePage.js";
import { expect } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../src/data/dict/models.js";
import { USERS } from "../../src/data/dict/users.js";
import { config } from "../../config/config.js";
import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

test.describe("API axios", () => {
    let client;
    let carId;

    test.beforeAll(async () => {
        const jar = new CookieJar();
        client = wrapper(axios.create({
            baseURL: config.apiURL,
            jar,
            validateStatus: (status) => {
                return status < 501;
            },
        }));

        await client.post('auth/signin', {
            "email": USERS.ALASKA_YOUNG.email,
            "password": USERS.ALASKA_YOUNG.password,
            "remember": false
        });
    });

    test("should create a new car", async () => {
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id;
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id;
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        };

        const response = await client.post('/cars', requestBody);
        carId = response.data.data.id; // Оновлено

        await expect(response.status, "Status code should be 201").toEqual(201);
        await expect(response.data.status).toBe("ok");
        await expect(response.data.data, "Car should be created with data from request").toMatchObject(requestBody);
    });

    test("should return an error when creating a new car with wrong brand and model id", async () => {
        const requestBody = {
            "carBrandId": 122,
            "carModelId": 122,
            "mileage": 122
        };

        const response = await client.post('/cars', requestBody);

        await expect(response.status, "Status code should be 404").toEqual(404);
        await expect(response.data.status).toBe("error");
        await expect(response.data.message).toBe("Brand not found");
    });

    test("should return an error when creating a new car without mileage", async () => {
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id;
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id;
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
        };

        const response = await client.post('/cars', requestBody);

        await expect(response.status, "Status code should be 400").toEqual(400);
        await expect(response.data.status).toBe("error");
        await expect(response.data.message).toBe("Mileage is required");
    });

    test.afterAll(async () => {
        const response = await client.delete(`cars/${carId}`);
        await expect(response.status, "Status code should be 200").toEqual(200);
        await expect(response.data.status).toBe("ok");
    });
});