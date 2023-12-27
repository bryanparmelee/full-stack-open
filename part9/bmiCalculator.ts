import isNotNumber from "./isNotNumber";

interface bmiValues {
  height: number;
  weight: number;
}

const parseArgs = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (((height / 100) * height) / 100);
  if (bmi >= 25) console.log("Overweight");
  if (bmi >= 18.5 && bmi < 25) console.log("Normal (healthy weight)");
  if (bmi < 18.5) console.log("Underweight");
};

try {
  const { height, weight } = parseArgs(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = "An error has occurred.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
