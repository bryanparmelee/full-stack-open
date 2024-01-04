import { useEffect, useState } from "react";
import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";
import AddDiaryForm from "./components/AddDiaryForm";
import DiaryList from "./components/DiaryList";

import diaryService from "./services/diaries";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiaries();
  }, []);

  const handleError = (message: string): void => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const addNewDiaryEntry = async (formValues: NewDiaryEntry) => {
    try {
      const newDiary = await diaryService.create(formValues);
      setDiaries(diaries.concat(newDiary));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data &&
          typeof error?.response?.data === "string"
        ) {
          const message = error.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          handleError(message);
        } else {
          handleError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", error);
        handleError("Unknown error");
      }
    }
  };

  if (diaries.length <= 0) return null;

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <AddDiaryForm onSubmit={addNewDiaryEntry} />
      <DiaryList {...diaries} />
    </div>
  );
}

export default App;
