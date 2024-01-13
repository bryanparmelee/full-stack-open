import { Diagnosis } from "../types";

interface Props {
  codes: string[];
  diagnoses: Diagnosis[];
}

const DiagnosisDetails = ({ codes, diagnoses }: Props) => {
  const patientDiagnoses: Diagnosis[] = [];

  codes.forEach((code) => {
    const diagnosis: Diagnosis | undefined = diagnoses.find(
      (d) => d.code === code
    );
    if (diagnosis) patientDiagnoses.push(diagnosis);
  });

  return (
    <>
      {patientDiagnoses.length > 0 && (
        <ul>
          {patientDiagnoses.map((d) => (
            <li key={d.code}>
              {d.code} {d.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DiagnosisDetails;
