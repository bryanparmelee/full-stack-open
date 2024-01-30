import { SyntheticEvent, useState } from "react";
import { EntryType, EntryWithoutId } from "../types";
import {
  TextField,
  Button,
  Alert,
  SelectChangeEvent,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

interface EntryTypeOption {
  value: EntryType;
  label: string;
}

const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(
  (e) => ({
    value: e,
    label: e.toString(),
  })
);

const AddEntryForm = ({ onSubmit, error }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[] | undefined>();
  const [type, setType] = useState(EntryType.HealthCheckEntry);
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [employerName, setEmployerName] = useState("");

  const handleEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const entryType = Object.values(EntryType).find(
        (e) => e.toString() === value
      );
      if (entryType) {
        setType(entryType);
      }
    }
  };

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

    switch (type) {
      case "HealthCheck":
        const newHealthCheckRatingEntry: EntryWithoutId = {
          ...newEntry,
          type,
          healthCheckRating,
        };
        onSubmit(newHealthCheckRatingEntry);
        break;
      case "OccupationalHealthcare":
        const newOccupationalHealthcareEntry: EntryWithoutId =
          startDate && endDate
            ? {
                ...newEntry,
                type,
                employerName,
                sickLeave: { startDate, endDate },
              }
            : {
                ...newEntry,
                type,
                employerName,
              };
        onSubmit(newOccupationalHealthcareEntry);
        break;
      case "Hospital":
        const newHospitalEntry: EntryWithoutId = {
          ...newEntry,
          type,
          discharge: { date: dischargeDate, criteria },
        };
        onSubmit(newHospitalEntry);
        break;
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <h2>Add New Entry</h2>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
        <Select
          label="Entry Type"
          fullWidth
          value={type}
          onChange={handleEntryTypeChange}
        >
          {entryTypeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label.split(/(?=[A-Z])/).join(" ")}
            </MenuItem>
          ))}
        </Select>

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
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
        />

        {type === "HealthCheck" && (
          <TextField
            type="number"
            label="Health Check Rating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value))
            }
          />
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <h4>Sick Leave (optional)</h4>
            <InputLabel style={{ marginTop: 20 }}>Start Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>End Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
            />
          </>
        )}

        {type === "Hospital" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
            <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Criteria"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
          </>
        )}

        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddEntryForm;
