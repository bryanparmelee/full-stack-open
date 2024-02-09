import { Diagnosis, HealthCheckEntry } from "../types";
import DiagnosisDetails from "./DiagnosisDetails";
import HealthRatingBar from "./HealthRatingBar";

interface Props {
  patientEntry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryDetails = ({ patientEntry, diagnoses }: Props) => {
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
      <HealthRatingBar
        rating={patientEntry.healthCheckRating}
        showText={true}
      />
      <br />
      diagnosed by {patientEntry.specialist}
    </div>
  );
};

export default HealthCheckEntryDetails;
