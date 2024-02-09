import {
  NewPatientEntry,
  Gender,
  Diagnosis,
  EntryWithoutId,
  Discharge,
  HealthCheckRating,
  SickLeave,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Missing or incorrect date format: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error("Incorrect or missing criteria");
  }
  return criteria;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("date" in object && "criteria" in object) {
    const discharge: Discharge = {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria),
    };
    return discharge;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      "Incorrect or missing health check rating " + healthCheckRating
    );
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("Incorrect or missing employer name");
  }
  return employerName;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("startDate" in object && "endDate" in object) {
    const sickLeave: SickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
    return sickLeave;
  }
  throw new Error("Incorrect data: Sick Leave data missing.");
};

export const toNewEntry = (object: unknown) => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const newEntry =
      "diagnosisCodes" in object
        ? {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
          }
        : {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
          };

    switch (object.type) {
      case "Hospital":
        if ("discharge" in object) {
          const newHospitalEntry: EntryWithoutId = {
            ...newEntry,
            type: "Hospital",
            discharge: parseDischarge(object.discharge),
          };
          return newHospitalEntry;
        }
        throw new Error("Incorrect data: discharge missing");
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const newHealthCheckEntry: EntryWithoutId = {
            ...newEntry,
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return newHealthCheckEntry;
        }
        throw new Error("Incorrect data: health check rating missing");
      case "OccupationalHealthcare":
        if ("employerName" in object) {
          const newOccupationalHealthcareEntry: EntryWithoutId =
            "sickLeave" in object
              ? {
                  ...newEntry,
                  type: "OccupationalHealthcare",
                  employerName: parseEmployerName(object.employerName),
                  sickLeave: parseSickLeave(object.sickLeave),
                }
              : {
                  ...newEntry,
                  type: "OccupationalHealthcare",
                  employerName: parseEmployerName(object.employerName),
                };

          return newOccupationalHealthcareEntry;
        }
        throw new Error("Incorrect data: missing employer name");
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};
