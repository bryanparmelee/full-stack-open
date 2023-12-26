import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notification";
import Recommend from "./components/Recommend";
import { useApolloClient, useSubscription } from "@apollo/client";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { BOOK_ADDED, ALL_BOOKS } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();
  const navigate = useNavigate();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      notify(`${addedBook.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("library-user-token");
    setToken(loggedInUser);
  }, []);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleLogout = () => {
    navigate("/");
    setToken(null);
    localStorage.clear();
    client.clearStore();
  };

  const buttonStyle = {
    padding: 5,
    margin: 2,
    borderRadius: 5,
    backgroundColor: "#e4e4e4",
    color: "black",
    textDecoration: "none",
    border: "1px solid black",
  };

  return (
    <div>
      <div>
        <Link style={buttonStyle} to="/authors">
          authors
        </Link>
        <Link style={buttonStyle} to="/books">
          books
        </Link>
        {!token ? (
          <Link style={buttonStyle} to="/login">
            login
          </Link>
        ) : (
          <>
            <Link style={buttonStyle} to="/add-book">
              add book
            </Link>
            <Link style={buttonStyle} to="/recommend">
              recommend
            </Link>
            <button
              style={{ ...buttonStyle, padding: 7 }}
              onClick={handleLogout}
            >
              logout
            </button>
          </>
        )}
      </div>

      <Notify errorMessage={errorMessage} />
      <Routes>
        <Route path="/" element={<Authors setError={notify} />} />
        <Route path="/authors" element={<Authors setError={notify} />} />
        <Route path="/books" element={<Books setError={notify} />} />
        <Route
          path="/add-book"
          element={
            token ? (
              <NewBook setError={notify} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/recommend"
          element={
            token ? (
              <Recommend setError={notify} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !token ? (
              <LoginForm setError={notify} setToken={setToken} />
            ) : (
              <Authors setError={notify} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
