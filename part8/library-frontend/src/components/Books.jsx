import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries";

const Books = (props) => {
  const booksResult = useQuery(ALL_BOOKS);
  const [getBooksByGenre, booksByGenreResult] = useLazyQuery(BOOKS_BY_GENRE);

  if (!props.show) {
    return null;
  }

  if (booksResult.loading || getBooksByGenre.loading) {
    return <div>Loading...</div>;
  }

  if (booksResult.error) {
    return <div>Error {booksResult.error}</div>;
  }

  if (getBooksByGenre.error) {
    return <div>Error {getBooksByGenre.error}</div>;
  }

  const books = [...booksResult.data.allBooks];

  let genres = new Set().add("all genres");
  books.map((book) => book.genres.map((genre) => genres.add(genre)));

  const tableData = booksByGenreResult.data
    ? [...booksByGenreResult.data.booksByGenre].map((b) => (
        <tr key={b.title}>
          <td>{b.title}</td>
          <td>{b.author.name}</td>
          <td>{b.published}</td>
        </tr>
      ))
    : books.map((b) => (
        <tr key={b.title}>
          <td>{b.title}</td>
          <td>{b.author.name}</td>
          <td>{b.published}</td>
        </tr>
      ));

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {tableData}
        </tbody>
      </table>
      {Array.from(genres).map((genre) => (
        <button
          key={genre}
          onClick={() => getBooksByGenre({ variables: { genre: `${genre}` } })}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
