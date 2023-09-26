const Course = ({ course }) => {
  const { name, parts } = course;

  const Header = () => <h1>{name}</h1>;

  const Total = ({ parts }) => {
    let sum = parts.reduce((a, b) => a + b.exercises, 0);

    return (
      <p>
        <b>Number of exercises {sum}</b>
      </p>
    );
  };

  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };

  const Content = ({ parts }) => {
    return (
      <>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </>
    );
  };
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
