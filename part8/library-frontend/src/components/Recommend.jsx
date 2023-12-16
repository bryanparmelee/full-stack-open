import { useQuery } from "@apollo/client";
import { BOOKS_BY_GENRE } from "../queries";

const Recommend = ({ show, currentUser }) => {
  const result = useQuery(BOOKS_BY_GENRE, {
    variables: {
      genre: currentUser.favoriteGenre,
    },
  });

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading....</div>;
  }

  const books = result.data.booksByGenre;

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{currentUser.favoriteGenre}</b>
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
