interface ResultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): ResultObject => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
