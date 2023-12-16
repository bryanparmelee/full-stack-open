import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState("all genres");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const result = useQuery(ALL_BOOKS);

  let books = [];

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) => book.genres.includes(`${genreFilter}`))
    );
  }, [genreFilter]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  books = [...result.data.allBooks];
  let genres = new Set().add("all genres");
  books.map((book) => book.genres.map((genre) => genres.add(genre)));

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
          {filteredBooks.length
            ? filteredBooks.map((b) => (
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
              ))}
        </tbody>
      </table>
      {Array.from(genres).map((genre) => (
        <button key={genre} onClick={() => setGenreFilter(`${genre}`)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
