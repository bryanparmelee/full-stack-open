import patients from "../../data/patients";
import { NonSensitivePatientEntry, NewPatientEntry, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, addPatient };
