import { Car } from "../model/Car";

export let cars: Car[] = [
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
