import { ChangeEvent, SyntheticEvent, useState } from "react";
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

  const handleVisibilityCheck = (e: ChangeEvent<HTMLInputElement>): void =>
    setVisibility(e.currentTarget.value);

  const isVisibilityChecked = (value: string): boolean => visibility === value;

  const handleWeatherCheck = (e: ChangeEvent<HTMLInputElement>): void =>
    setWeather(e.currentTarget.value);

  const isWeatherChecked = (value: string): boolean => weather === value;

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
            type="radio"
            name="visibility"
            value="great"
            id="great"
            checked={isVisibilityChecked("great")}
            onChange={handleVisibilityCheck}
            required
          />
          <label htmlFor="great">great</label>
          <input
            type="radio"
            name="visibility"
            value="good"
            id="good"
            checked={isVisibilityChecked("good")}
            onChange={handleVisibilityCheck}
          />
          <label htmlFor="good">good</label>
          <input
            type="radio"
            name="visibility"
            value="ok"
            id="ok"
            checked={isVisibilityChecked("ok")}
            onChange={handleVisibilityCheck}
          />
          <label htmlFor="ok">ok</label>
          <input
            type="radio"
            name="visibility"
            value="poor"
            id="poor"
            checked={isVisibilityChecked("poor")}
            onChange={handleVisibilityCheck}
          />
          <label htmlFor="poor">poor</label>
        </div>
        <div>
          weather:
          <input
            type="radio"
            name="weather"
            value="sunny"
            id="sunny"
            checked={isWeatherChecked("sunny")}
            onChange={handleWeatherCheck}
            required
          />
          <label htmlFor="sunny">sunny</label>
          <input
            type="radio"
            name="weather"
            value="rainy"
            id="rainy"
            checked={isWeatherChecked("rainy")}
            onChange={handleWeatherCheck}
          />
          <label htmlFor="rainy">rainy</label>
          <input
            type="radio"
            name="weather"
            value="cloudy"
            id="cloudy"
            checked={isWeatherChecked("cloudy")}
            onChange={handleWeatherCheck}
          />
          <label htmlFor="cloudy">cloudy</label>
          <input
            type="radio"
            name="weather"
            value="stormy"
            id="stormy"
            checked={isWeatherChecked("stormy")}
            onChange={handleWeatherCheck}
          />
          <label htmlFor="stormy">stormy</label>
          <input
            type="radio"
            name="weather"
            value="windy"
            id="windy"
            checked={isWeatherChecked("windy")}
            onChange={handleWeatherCheck}
          />
          <label htmlFor="windy">windy</label>
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
