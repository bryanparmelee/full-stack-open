import { gql } from "@apollo/client";

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    id
    genres
    author {
      name
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const BOOKS_BY_GENRE = gql`
  query findBooksByGenre($genre: String!) {
    booksByGenre(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

export const BOOKS_BY_USER = gql`
  query {
    booksByUser {
      title
      published
      id
      genres
      author {
        name
      }
    }
    me {
      favoriteGenre
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($author: String!, $birthyear: Int!) {
    editAuthor(name: $author, setBornTo: $birthyear) {
      name
      born
      id
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`;
