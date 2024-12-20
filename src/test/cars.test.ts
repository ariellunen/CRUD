import request from "supertest";
import { app } from "../index";

describe("GET /cars/:id", () => {
  it("should return the car details for a valid id", async () => {
    const newCar = {
      color: "blue",
      type: "sedan",
      registration: "2022-10-10",
      capacity: 4,
    };

    const createdResponse = await request(app).post("/cars").send(newCar);
    const carId = createdResponse.body.id;

    const response = await request(app).get(`/cars/${carId}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(newCar);
    expect(response.body.id).toBe(carId);
  });

  it("should return 404 for invalid car id", async () => {
    const invalidId = 9999;
    const response = await request(app).get(`/cars/${invalidId}`);
    expect(response.status).toBe(404);
  });
});

describe("DELETE /cars/:id", () => {
  it("should delete the car and return the id", async () => {
    const newCar = {
      color: "blue",
      type: "sedan",
      registration: "2022-10-10",
      capacity: 4,
    };

    const createdResponse = await request(app).post("/cars").send(newCar);
    const carId = createdResponse.body.id;

    const response = await request(app).delete(`/cars/${carId}`);
    expect(response.status).toBe(200);
  });

  it("should return status 404 with invalid id", async () => {
    const invalidId = 99999;
    const response = await request(app).delete(`/cars/${invalidId}`);
    expect(response.status).toBe(404);
  });
});

describe("Filter cars", () => {
  it("should return the car array filtered", async () => {
    const response = await request(app).get("/cars/filter?color=blue");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        color: "blue",
        type: expect.any(String),
        registration: expect.any(String),
        capacity: expect.any(Number),
      },
    ]);
  });
});
