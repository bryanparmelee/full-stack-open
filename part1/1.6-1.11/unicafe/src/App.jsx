import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const Button = (props) => {
    return <button onClick={props.clickHandler}>{props.text}</button>;
  };

  const goodClickHandler = () => setGood(good + 1);
  const neutralClickHandler = () => setNeutral(neutral + 1);
  const badClickHandler = () => setBad(bad + 1);

  const StatisticsLine = (props) => {
    const { text, value } = props;
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    );
  };

  const Statistics = ({ good, neutral, bad }) => {
    if (good > 0 || neutral > 0 || bad > 0) {
      return (
        <table>
          <thead>
            <tr>
              <th>
                <h1>Statistics</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={good + neutral + bad} />
            <StatisticsLine text="average" value={(good + neutral + bad) / 3} />
            <StatisticsLine
              text="positive"
              value={(good / (good + neutral + bad)) * 100 + " %"}
            />
          </tbody>
        </table>
      );
    } else {
      return <h2>No feedback given</h2>;
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" clickHandler={goodClickHandler} />
      <Button text="neutral" clickHandler={neutralClickHandler} />
      <Button text="bad" clickHandler={badClickHandler} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
