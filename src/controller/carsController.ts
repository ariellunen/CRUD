import { Request, Response } from "express";

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

export const getCars = (req: Request, res: Response) => {
  return res.status(200).json(cars);
};

export const getCarById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const car = cars.find((c) => c.id === parseInt(id));
  if (!car) {
    return res
      .status(404)
      .json({ message: `Car with the id: ${id} not found` });
  }
  return res.status(200).json(car);
};

export const addCar = (req: Request, res: Response) => {
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

export const updateCar = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { color, type, registration, capacity } = req.body;
  const car = cars.find((c) => c.id === parseInt(id));

  if (!car) {
    return res.status(404).json(`car with the id ${id} wasn't found`);
  }

  if (color) car.color = color;
  if (type) car.type = type;
  if (registration) car.registration = registration;
  if (capacity) car.capacity = capacity;

  return res.status(200).json("car was added!");
};

export const deleteCar = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const car = cars.find((c) => c.id === parseInt(id));
  if (!car) {
    return res.status(404).json(`car with the id ${id} not found`);
  }
  cars = cars.filter((c) => c.id !== parseInt(id));
  return res.status(200).json("car was deleted");
};

export const filterCar = (req: Request, res: Response) => {
  const filters = req.query;
  let filteredCars = cars;

  if (!filters) {
    return res.status(200).json(cars);
  }

  Object.keys(filters).forEach((key) => {
    filteredCars = filteredCars.filter(
      (c) => c[key as keyof typeof c] === filters[key]
    );
  });

  if (filteredCars.length === 0) {
    return res.status(200).json("No match results for this filters");
  }
  return res.status(200).json(filteredCars);
};
