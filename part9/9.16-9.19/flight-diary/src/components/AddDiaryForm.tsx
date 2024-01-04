import { SyntheticEvent, useState } from "react";
import { NewDiaryEntry } from "../types";

interface Props {
  onSubmit: (formValues: NewDiaryEntry) => void;
}

const AddDiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      weather,
      visibility,
      comment,
    });
    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };
  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          date:
          <input
            type="date"
            name="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility:
          <input
            type="text"
            name="visibility"
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          weather:
          <input
            type="text"
            name="weather"
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          comment:
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AddDiaryForm;
