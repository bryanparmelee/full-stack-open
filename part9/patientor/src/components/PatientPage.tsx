import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, BaseEntry } from "../types";
import patientService from "../services/patients";
import EntryData from "./EntryData";

type searchParams = {
  id: string;
};

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams<searchParams>();

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    if (id) void fetchPatient(id);
  }, []);

  if (!patient) return null;

  return (
    <div>
      <h2>{patient.name}</h2>

      <p>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
      {patient.entries.length > 0 && (
        <>
          <h2>entries</h2>
          {patient.entries.map((entry: BaseEntry) => (
            <EntryData key={entry.id} {...entry} />
          ))}
        </>
      )}
    </div>
  );
};

export default PatientPage;
