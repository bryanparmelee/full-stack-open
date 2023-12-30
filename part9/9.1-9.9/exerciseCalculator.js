"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExercises = void 0;
var isNotNumber_1 = require("./isNotNumber");
var parseArgs = function (args) {
    if (args.length < 4)
        throw new Error("Not enough arguments");
    if ((0, isNotNumber_1.isNotNumber)(Number(args[2])))
        throw new Error("Provided values were not numbers!");
    var hours = args.slice(3);
    if (hours.some(isNotNumber_1.isNotNumber))
        throw new Error("Provided values were not numbers!");
    return {
        daily_exercises: hours.map(Number),
        target: Number(args[2]),
    };
};
var calculateExercises = function (hours, target) {
    var periodLength = hours.length;
    var trainingDays = hours.filter(function (h) { return h !== 0; }).length;
    var average = hours.reduce(function (a, b) { return a + b; }, 0) / periodLength;
    var success = average >= target;
    var rating = success ? 3 : target - average <= 2 ? 2 : 1;
    var ratingDescription = rating === 3
        ? "Great job!"
        : rating === 2
            ? "not too bad but could be better"
            : "Not so great";
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };
};
exports.calculateExercises = calculateExercises;
try {
    var _a = parseArgs(process.argv), target = _a.target, daily_exercises = _a.daily_exercises;
    console.log((0, exports.calculateExercises)(daily_exercises, target));
}
catch (error) {
    var errorMessage = "An error has occurred.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}
