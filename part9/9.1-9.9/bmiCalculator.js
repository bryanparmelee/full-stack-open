"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBmi = void 0;
var isNotNumber_1 = require("./isNotNumber");
var parseArgs = function (args) {
    if (args.length < 4)
        throw new Error("Not enough arguments");
    if (args.length > 4)
        throw new Error("Too many arguments");
    if (!(0, isNotNumber_1.isNotNumber)(args[2]) && !(0, isNotNumber_1.isNotNumber)(args[3])) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    }
    else {
        throw new Error("Provided values were not numbers!");
    }
};
var calculateBmi = function (height, weight) {
    var bmi = weight / (((height / 100) * height) / 100);
    if (bmi >= 25) {
        return "Overweight";
    }
    else if (bmi >= 18.5 && bmi < 25) {
        return "Normal (healthy weight)";
    }
    else {
        return "Underweight";
    }
};
exports.calculateBmi = calculateBmi;
try {
    var _a = parseArgs(process.argv), height = _a.height, weight = _a.weight;
    console.log((0, exports.calculateBmi)(height, weight));
}
catch (error) {
    var errorMessage = "An error has occurred.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}
