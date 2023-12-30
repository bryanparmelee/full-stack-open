"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bmiCalculator_1 = require("./bmiCalculator");
var exerciseCalculator_1 = require("./exerciseCalculator");
var isNotNumber_1 = require("./isNotNumber");
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/hello", function (_req, res) {
    res.send("Hello Full Stack!");
});
app.get("/bmi", function (req, res) {
    try {
        var _a = req.query, height = _a.height, weight = _a.weight;
        if (!height || (0, isNotNumber_1.isNotNumber)(height) || !weight || (0, isNotNumber_1.isNotNumber)(weight))
            throw new Error("malformatted parameters");
        res.status(200).json({
            weight: Number(weight),
            height: Number(height),
            bmi: (0, bmiCalculator_1.calculateBmi)(Number(height), Number(weight)),
        });
    }
    catch (error) {
        var errorMessage = "";
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.status(400).json({
            error: errorMessage,
        });
    }
});
app.post("/exercises", function (req, res) {
    try {
        var _a = req.body, daily_exercises = _a.daily_exercises, target = _a.target;
        if (!daily_exercises || !target)
            throw new Error("parameters missing");
        if (daily_exercises.some(isNotNumber_1.isNotNumber) || (0, isNotNumber_1.isNotNumber)(target))
            throw new Error("malformatted parameters");
        var hours = daily_exercises.map(Number);
        res.status(200).json((0, exerciseCalculator_1.calculateExercises)(hours, target));
    }
    catch (error) {
        var errorMessage = "";
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.status(400).json({
            error: errorMessage,
        });
    }
});
var PORT = 3003;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
