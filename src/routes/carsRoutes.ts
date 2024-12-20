import { Router } from "express";
import {
  addCar,
  deleteCar,
  filterCar,
  getCarById,
  getCars,
  updateCar,
} from "../controller/carsController";

const router = Router();

router.get("/", getCars);
router.get("/filter", filterCar);
router.get("/:id", getCarById);
router.post("/", addCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export default router;
