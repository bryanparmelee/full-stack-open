import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import BirthYearForm from "./BirthYearForm";

const Authors = ({ setError }) => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.error) {
    setError(result.error);
  }

  const authors = [...result.data.allAuthors];

  const options = authors.map((a) => ({
    value: `${a.name}`,
    label: `${a.name}`,
  }));

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BirthYearForm options={options} />
    </>
  );
};

export default Authors;
