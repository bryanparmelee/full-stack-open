import { DiaryEntry } from "../types";

const Diary = (diary: DiaryEntry) => {
  return (
    <>
      <h3>{diary.date}</h3>
      <p>
        visibilty: {diary.visibility}
        <br />
        weather: {diary.weather}
      </p>
    </>
  );
};

export default Diary;
