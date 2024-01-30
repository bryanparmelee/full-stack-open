import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (
  patient: Patient,
  object: EntryWithoutId
): Promise<Entry> => {
  const { id } = patient;
  const { data } = await axios.post<EntryWithoutId>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  return data as Entry;
};

export default {
  getAll,
  getById,
  create,
  addEntry,
};
