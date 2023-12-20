import { useQuery } from "@apollo/client";
import { BOOKS_BY_USER } from "../queries";

const Recommend = (props) => {
  const result = useQuery(BOOKS_BY_USER);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading....</div>;
  }

  if (result.error) {
    return <div>Error {result.error}</div>;
  }

  const books = [...result.data.booksByUser];
  const genre = result.data.me.favoriteGenre;

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{genre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
