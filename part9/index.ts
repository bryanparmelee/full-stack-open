import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ExerciseValues } from "./exerciseCalculator";
import { isNotNumber } from "./isNotNumber";

import express from "express";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = req.query;
    if (!height || isNotNumber(height) || !weight || isNotNumber(weight))
      throw new Error("malformatted parameters");
    res.status(200).json({
      weight: Number(weight),
      height: Number(height),
      bmi: calculateBmi(Number(height), Number(weight)),
    });
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).json({
      error: errorMessage,
    });
  }
});

app.post("/exercises", (req, res) => {
  try {
    const { daily_exercises, target } = req.body as ExerciseValues;
    if (!daily_exercises || !target) throw new Error("parameters missing");
    if (daily_exercises.some(isNotNumber) || isNotNumber(target))
      throw new Error("malformatted parameters");
    const hours: number[] = daily_exercises.map(Number);
    res.status(200).json(calculateExercises(hours, target));
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).json({
      error: errorMessage,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
