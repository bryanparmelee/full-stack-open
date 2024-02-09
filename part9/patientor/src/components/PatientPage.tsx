import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis, Entry, EntryWithoutId } from "../types";
import patientService from "../services/patients";
import EntryDetails from "./EntryDetails";
import axios from "axios";
import AddEntryModal from "./AddEntryModal";
import { Button } from "@mui/material";

type searchParams = {
  id: string;
};

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();
  const { id } = useParams<searchParams>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    if (id) void fetchPatient(id);
  }, []);

  const submitNewEntry = async (values: EntryWithoutId) => {
    if (patient) {
      try {
        const entry = await patientService.addEntry(patient, values);
        const updatedPatient = {
          ...patient,
          entries: patient.entries.concat(entry),
        };
        setPatient(updatedPatient);
        setModalOpen(false);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace(
              "Something went wrong. Error: ",
              ""
            );
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    } else {
      setError("Patient not found.");
    }
  };

  if (!patient) {
    return <div>Patient not found.</div>;
  }

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
          {patient.entries.map((entry: Entry) => (
            <EntryDetails
              key={entry.id}
              patientEntry={entry}
              diagnoses={diagnoses}
            />
          ))}
        </>
      )}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
