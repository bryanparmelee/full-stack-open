const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Author {
    name: String!,
    id: ID!,
    born: Int,
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
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author });
        const booksByAuthor = await Book.find({ author: author }).populate(
          "author"
        );
        return booksByAuthor;
      }

      if (args.genre && !args.author) {
        const booksByGenre = await Book.find({ genres: args.genre }).populate(
          "author"
        );
        return booksByGenre;
      }

      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        const booksByAuthorAndGenre = await Book.find({
          author: author,
          genres: args.genre,
        }).populate("author");
        return booksByAuthorAndGenre;
      }

      return Book.find({}).populate("author");
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
    booksByGenre: async (root, args) => {
      const books = await Book.find({ genres: args.genre }).populate("author");
      return books;
    },
  },
  // Author: {
  //   bookCount: (root) => books.filter((b) => b.author === root.name).length,
  // },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const existingAuthor = await Author.findOne({ name: args.author });

      if (!existingAuthor) {
        const author = new Author({ name: args.author });
        const newAuthor = await author.save();
        const book = new Book({ ...args, author: newAuthor });
        try {
          await book.save();
        } catch (error) {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          });
        }
        return book;
      } else {
        const book = new Book({ ...args, author: existingAuthor });
        try {
          await book.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          });
        }
        return book;
      }
    },
    addAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = new Author({ ...args });
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return author;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
