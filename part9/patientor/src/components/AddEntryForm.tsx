import { SyntheticEvent, useState } from "react";
import { EntryWithoutId } from "../types";
import { TextField, Button, Alert } from "@mui/material";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddEntryForm = ({ onSubmit, error }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[] | undefined>();
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  // const [type, setType] = useState<"HealthCheck" | "OccupationalHealthcare" | "Hospital">('HealthCheck');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const newEntry = diagnosisCodes
      ? {
          description,
          date,
          specialist,
          diagnosisCodes,
        }
      : {
          description,
          date,
          specialist,
        };

    const newHealthCheckRatingEntry: EntryWithoutId = {
      ...newEntry,
      type: "HealthCheck",
      healthCheckRating,
    };

    onSubmit(newHealthCheckRatingEntry);
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          type="number"
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddEntryForm;
