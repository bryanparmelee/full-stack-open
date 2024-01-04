import { DiaryEntry } from "../types";
import Diary from "./Diary";

const DiaryList = (diaries: DiaryEntry[]) => {
  return (
    <>
      {Object.values(diaries).map((diary: DiaryEntry) => (
        <Diary key={diary.id} {...diary} />
      ))}
    </>
  );
};

export default DiaryList;
