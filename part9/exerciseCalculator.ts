import { isNotNumber } from "./isNotNumber";

export interface ExerciseValues {
  daily_exercises: number[];
  target: number;
}

interface ResultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgs = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (isNotNumber(Number(args[2])))
    throw new Error("Provided values were not numbers!");
  const hours = args.slice(3);
  if (hours.some(isNotNumber))
    throw new Error("Provided values were not numbers!");
  return {
    daily_exercises: hours.map(Number),
    target: Number(args[2]),
  };
};

export const calculateExercises = (
  hours: number[],
  target: number
): ResultObject => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((h) => h !== 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : target - average <= 2 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "Great job!"
      : rating === 2
      ? "not too bad but could be better"
      : "Not so great";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, daily_exercises } = parseArgs(process.argv);
  console.log(calculateExercises(daily_exercises, target));
} catch (error) {
  let errorMessage = "An error has occurred.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
