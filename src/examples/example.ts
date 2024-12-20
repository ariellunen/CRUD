import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";

const app: Application = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;
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

app.get("/cars", (req: Request, res: Response) => {
  return res.json(cars);
});

app.get("/cars/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const car = cars.find((c) => c.id === parseInt(id));

  if (!car) {
    return res.status(404).json({ message: "car not found" });
  }
  return res.json(car);
});

// write jests validation
app.post("/cars", (req: Request, res: Response) => {
  const { color, type, registration, capacity } = req.body;

  if (!color || !type || !registration || !capacity) {
    return res.status(404).json("some data is missing");
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
});

app.delete("/cars/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const car = cars.find((c) => c.id === parseInt(id));
  if (!car) {
    return res.status(404).json(`car with the id ${id} wasn't found`);
  }

  cars = cars.filter((car) => car.id !== parseInt(id));

  return res
    .status(200)
    .json({ message: `Car with the id ${id} was deleted!` });
});

app.put("/cars/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { color, type, registration, capacity } = req.body;
  const car = cars.find((c) => c.id === parseInt(id));
  if (!car) return res.status(404).json({ message: "Task not found" });

  if (color) car.color = color;
  if (type) car.type = type;
  if (registration) car.registration = registration;
  if (capacity) car.capacity = capacity;

  return res
    .status(200)
    .json({ message: `car with the id ${id} was updated!` });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

export { app };
