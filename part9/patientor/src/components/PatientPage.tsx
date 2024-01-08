import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import patientService from "../services/patients";

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

      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;
