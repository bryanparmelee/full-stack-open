import { CoursePart } from "../App";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (course: CoursePart) => {
  switch (course.kind) {
    case "basic":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          <i>{course.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          Project exercises {course.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          <i>{course.description}</i>
          <br />
          submit to {course.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          <i>{course.description}</i>
          <br />
          required skills:{" "}
          {course.requirements.map((r, i, a) =>
            i !== a.length - 1 ? `${r}, ` : `${r}`
          )}
        </p>
      );
    default:
      return assertNever(course);
  }
};

export default Part;
