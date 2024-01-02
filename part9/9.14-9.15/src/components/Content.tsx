import Part from "./Part";

import { CoursePart } from "../App";

const Content = (props: CoursePart) => {
  return <Part {...props} />;
};

export default Content;
