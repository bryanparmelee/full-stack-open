const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

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
    allAuthors: async () => Author.find({}).populate("books"),
    me: (root, args, context) => context.currentUser,
    booksByUser: async (root, args, context) => {
      const favoriteGenre = context.currentUser.favoriteGenre;
      const books = await Book.find({ genres: favoriteGenre }).populate(
        "author"
      );
      return books;
    },
    booksByGenre: async (root, args) => {
      if (args.genre === "all genres") return null;
      const books = await Book.find({ genres: args.genre }).populate("author");
      return books;
    },
  },
  Author: {
    bookCount: async (root) => root.books.length,
  },
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
          await author.updateOne({
            $push: { books: book },
          });
        } catch (error) {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          });
        }

        pubsub.publish("BOOK_ADDED", { bookAdded: book });

        return book;
      } else {
        const book = new Book({ ...args, author: existingAuthor });
        try {
          await book.save();
          await existingAuthor.updateOne({
            $push: { books: book },
          });
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          });
        }

        pubsub.publish("BOOK_ADDED", { bookAdded: book });

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
