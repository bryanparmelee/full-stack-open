"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error("Incorrect or missing name");
    }
    return name;
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Missing or incorrect date format: " + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!isString(ssn)) {
        throw new Error("Incorrect or missing ssn");
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((g) => g.toString())
        .includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender " + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};
const entryTypes = ["Hospital", "OccupationalHealthcare", "HealthCheck"];
const parseEntries = (entries) => {
    if (!entries || !Array.isArray(entries)) {
        throw new Error("Missing entries");
    }
    if (entries.length === 0) {
        return [];
    }
    if (!entries.every((entry) => entryTypes.includes(`${entry.type}`))) {
        throw new Error("Incomplete entries");
    }
    return entries;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object &&
        "entries" in object) {
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(object.entries),
        };
        return newPatient;
    }
    throw new Error("Incorrect data: some fields are missing");
};
exports.default = toNewPatientEntry;
