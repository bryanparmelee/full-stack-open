import patients from "../../data/patients";
import {
  NonSensitivePatientEntry,
  NewPatientEntry,
  Patient,
  Entry,
  EntryWithoutId,
} from "../types";
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

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default { getPatients, getPatientById, addPatient, addEntry };
