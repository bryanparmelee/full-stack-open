import { Diagnosis, HospitalEntry } from "../types";
import DiagnosisDetails from "./DiagnosisDetails";

interface Props {
  patientEntry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryDetails = ({ patientEntry, diagnoses }: Props) => {
  return (
    <div style={{ border: "1px solid black", marginBottom: "10px" }}>
      {patientEntry.date} {patientEntry.type.split(/(?=[A-Z])/).join(" ")}
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
      diagnosed by {patientEntry.specialist}
      <br />
      Discharged on {patientEntry.discharge.date}:{" "}
      {patientEntry.discharge.criteria}
    </div>
  );
};

export default HospitalEntryDetails;
