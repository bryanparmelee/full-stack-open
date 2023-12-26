const typeDefs = `
  type Author {
    name: String!,
    id: ID!,
    born: Int,
    books: [Book!]!
    bookCount: Int!
  }

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String!]!,
    id: ID!, 
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!,
    me: User,
    booksByUser:[Book!]!
    booksByGenre(genre: String!): [Book!]!
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String!,    
      genres: [String!]! 
    ): Book!,
    addAuthor(
      name: String!
    ): Author,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author 
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token   
  }

  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
