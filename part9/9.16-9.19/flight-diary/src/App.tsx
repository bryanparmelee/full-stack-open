import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";

import diaryService from "./services/diaries";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiaries();
  }, []);

  if (diaries.length <= 0) return null;

  return (
    <div>
      <h2>Diary Entries</h2>
      {diaries.map((diary) => (
        <>
          <h3>{diary.date}</h3>
          <p>
            visibilty: {diary.visibility}
            <br />
            weather: {diary.weather}
          </p>
        </>
      ))}
    </div>
  );
}

export default App;
