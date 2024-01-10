import { BaseEntry, Diagnosis } from "../types";

interface Props {
  patientEntry: BaseEntry;
  diagnoses: Diagnosis[];
}

const EntryData = ({ patientEntry, diagnoses }: Props) => {
  return (
    <div>
      {patientEntry.date} {patientEntry.description}
      {patientEntry.diagnosisCodes &&
        patientEntry.diagnosisCodes.length > 0 && (
          <ul>
            {patientEntry.diagnosisCodes?.map((code: string) => {
              const diagnosis: Diagnosis | undefined = diagnoses.find(
                (d) => d.code === code
              );
              return (
                <li key={code}>
                  {code} {diagnosis && diagnosis.name}
                </li>
              );
            })}
          </ul>
        )}
    </div>
  );
};

export default EntryData;
