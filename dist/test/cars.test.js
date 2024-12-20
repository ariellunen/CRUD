"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
describe("GET /cars/:id", () => {
    it("should return the car details for a valid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCar = {
            color: "blue",
            type: "sedan",
            registration: "2022-10-10",
            capacity: 4,
        };
        const createdResponse = yield (0, supertest_1.default)(index_1.app).post("/cars").send(newCar);
        const carId = createdResponse.body.id;
        const response = yield (0, supertest_1.default)(index_1.app).get(`/cars/${carId}`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(newCar);
        expect(response.body.id).toBe(carId);
    }));
    it("should return 404 for invalid car id", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = 9999;
        const response = yield (0, supertest_1.default)(index_1.app).get(`/cars/${invalidId}`);
        expect(response.status).toBe(404);
    }));
});
describe("DELETE /cars/:id", () => {
    it("should delete the car and return the id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCar = {
            color: "blue",
            type: "sedan",
            registration: "2022-10-10",
            capacity: 4,
        };
        const createdResponse = yield (0, supertest_1.default)(index_1.app).post("/cars").send(newCar);
        const carId = createdResponse.body.id;
        const response = yield (0, supertest_1.default)(index_1.app).delete(`/cars/${carId}`);
        expect(response.status).toBe(200);
    }));
    it("should return status 404 with invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = 99999;
        const response = yield (0, supertest_1.default)(index_1.app).delete(`/cars/${invalidId}`);
        expect(response.status).toBe(404);
    }));
});
describe("Filter cars", () => {
    it("should return the car array filtered", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get("/cars/filter?color=red");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                id: 2,
                color: "red",
                type: "station wagon",
                registration: new Date("2018-03-03"),
                capacity: 5,
            },
        ]);
    }));
});
