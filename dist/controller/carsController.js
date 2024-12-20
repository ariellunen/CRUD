"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterCar = exports.deleteCar = exports.updateCar = exports.addCar = exports.getCarById = exports.getCars = void 0;
let cars = [
    {
        id: 1,
        color: "purple",
        type: "minivan",
        registration: new Date("2017-01-03"),
        capacity: 7,
    },
    {
        id: 2,
        color: "red",
        type: "station wagon",
        registration: new Date("2018-03-03"),
        capacity: 5,
    },
];
const getCars = (req, res) => {
    return res.status(200).json(cars);
};
exports.getCars = getCars;
const getCarById = (req, res) => {
    const { id } = req.params;
    const car = cars.find((c) => c.id === parseInt(id));
    if (!car) {
        return res.status(401).json(`car with the id: ${id} not found`);
    }
    return res.status(200).json(car);
};
exports.getCarById = getCarById;
const addCar = (req, res) => {
    const { color, type, registration, capacity } = req.body;
    if (!color || !type || !registration || !capacity) {
        return res.status(404).json("Some data is missing");
    }
    const newCar = {
        id: Date.now(),
        color: color,
        type: type,
        registration: registration,
        capacity: capacity,
    };
    cars.push(newCar);
    return res.status(201).json(newCar);
};
exports.addCar = addCar;
const updateCar = (req, res) => {
    const { id } = req.params;
    const { color, type, registration, capacity } = req.body;
    const car = cars.find((c) => c.id === parseInt(id));
    if (!car) {
        return res.status(404).json(`car with the id ${id} wasn't found`);
    }
    if (color)
        car.color = color;
    if (type)
        car.type = type;
    if (registration)
        car.registration = registration;
    if (capacity)
        car.capacity = capacity;
    return res.status(200).json("car was added!");
};
exports.updateCar = updateCar;
const deleteCar = (req, res) => {
    const { id } = req.params;
    const car = cars.find((c) => c.id === parseInt(id));
    if (!car) {
        return res.status(404).json(`car with the id ${id} not found`);
    }
    cars = cars.filter((c) => c.id !== parseInt(id));
    return res.status(200).json("car was deleted");
};
exports.deleteCar = deleteCar;
const filterCar = (req, res) => {
    const filters = req.query;
    let filteredCars = cars;
    if (!filters) {
        return res.status(200).json(cars);
    }
    Object.keys(filters).forEach((key) => {
        filteredCars = filteredCars.filter((c) => c[key] === filters[key]);
    });
    if (filteredCars.length === 0) {
        return res.status(200).json("No match results for this filters");
    }
    return res.status(200).json(filteredCars);
};
exports.filterCar = filterCar;
