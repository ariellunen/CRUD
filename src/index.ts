import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import carsRoutes from "./routes/carsRoutes";
const app: Application = express();
dotenv.config();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/cars", carsRoutes);

// start the server
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

export { app };
