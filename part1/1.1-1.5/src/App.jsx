const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const Header = (props) => {
    return <h1>{props.course.name}</h1>;
  };

  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    );
  };

  const Content = (props) => {
    return (
      <div>
        <Part part={props.course[0]} />
        <Part part={props.course[1]} />
        <Part part={props.course[2]} />
      </div>
    );
  };

  const Total = (props) => {
    const parts = props.course;
    return (
      <p>
        Total no. of exercises:{" "}
        {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </p>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course.parts} />
      <Total course={course.parts} />
    </div>
  );
};

export default App;
