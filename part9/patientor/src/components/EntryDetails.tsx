import { Diagnosis, Entry } from "../types";
import HealthCheckEntryDetails from "./HealthCheckEntry";
import HospitalEntryDetails from "./HospitalEntry";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntry";

interface Props {
  patientEntry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ patientEntry, diagnoses }: Props) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (patientEntry.type) {
    case "Hospital":
      return (
        <HospitalEntryDetails
          patientEntry={patientEntry}
          diagnoses={diagnoses}
        />
      );
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryDetails
          patientEntry={patientEntry}
          diagnoses={diagnoses}
        />
      );
    case "HealthCheck":
      return (
        <HealthCheckEntryDetails
          patientEntry={patientEntry}
          diagnoses={diagnoses}
        />
      );
    default:
      assertNever(patientEntry);
  }
};

export default EntryDetails;
