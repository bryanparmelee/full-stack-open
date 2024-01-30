import { Diagnosis, HospitalEntry } from "../types";
import DiagnosisDetails from "./DiagnosisDetails";

interface Props {
  patientEntry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryDetails = ({ patientEntry, diagnoses }: Props) => {
  return (
    <div>
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
    </div>
  );
};

export default HospitalEntryDetails;
