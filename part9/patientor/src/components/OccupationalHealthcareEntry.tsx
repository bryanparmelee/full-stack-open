import { OccupationalHealthcareEntry, Diagnosis } from "../types";
import DiagnosisDetails from "./DiagnosisDetails";

interface Props {
  patientEntry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryDetails = ({
  patientEntry,
  diagnoses,
}: Props) => {
  return (
    <div style={{ border: "1px solid black", marginBottom: "10px" }}>
      {patientEntry.date} {patientEntry.type.split(/(?=[A-Z])/).join(" ")}{" "}
      {patientEntry.employerName}
      <br />
      {patientEntry.description}
      <br />
      {patientEntry.diagnosisCodes &&
        patientEntry.diagnosisCodes.length > 0 && (
          <>
            <DiagnosisDetails
              codes={patientEntry.diagnosisCodes}
              diagnoses={diagnoses}
            />
            <br />
          </>
        )}
      {patientEntry.sickLeave && (
        <>
          {patientEntry.sickLeave.startDate} - {patientEntry.sickLeave.endDate}
          <br />
        </>
      )}
      diagnosed by {patientEntry.specialist}
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
