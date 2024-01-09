import { BaseEntry } from "../types";

const EntryData = (props: BaseEntry) => {
  return (
    <div>
      {props.date} {props.description}
      {props.diagnosisCodes && props.diagnosisCodes.length > 0 && (
        <ul>
          {props.diagnosisCodes?.map((code: string) => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EntryData;
