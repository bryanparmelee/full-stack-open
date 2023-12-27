import isNotNumber from "./isNotNumber";

interface ExerciseValues {
  target: number;
  hours: number[];
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
    target: Number(args[2]),
    hours: hours.map(Number),
  };
};

const calculateExercises = (hours: number[], target: number) => {
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

  console.log({
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  });
};

try {
  const { target, hours } = parseArgs(process.argv);
  calculateExercises(hours, target);
} catch (error) {
  let errorMessage = "An error has occurred.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
