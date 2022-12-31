require("dotenv").config();
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/Book");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("mongo connection succcesssful");
});

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    # authorCount: Int!
    allBooks(author: String, genres: String): [Books!]!
    allAuthors: [Authors!]!
    me: User
  }

  type Authors {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Books {
    title: String!
    published: String!
    author: Authors
    genres: [String!]!
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Books
    editAuthor(name: String!, born: Int!): Authors
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genres) {
        const author = await Author.findOne({ name: args.author });
        // Check mongo in operator : https://www.mongodb.com/docs/manual/reference/operator/query/in/
        const books = await Book.find({
          author: { $in: [author.id] },
          genres: { $in: [args.genres] },
        }).populate("author");
        return books;
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        const books = await Book.find({ author: author.id }).populate("author");
        return books;
      } else if (args.genres) {
        const books = Book.find({ genres: { $in: [args.genres] } }).populate(
          "author"
        );
        return books;
      } else {
        const books = await Book.find({}).populate("author");
        return books;
      }
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: (roots, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated");
      }

      if (args.author.length < 4 || args.title.length < 2) {
        throw new UserInputError(
          "Author name must be at least 4 characters long and book title must be at least 2 characters long"
        );
      }
      // if author exists
      const authorData = await Author.findOne({ name: args.author });
      if (authorData) {
        const book = new Book({ ...args, author: authorData.id });
        await book.save();
        return book.populate("author");
      } else {
        // saving the author first
        const author = new Author({ name: args.author });
        await author.save();
        // searching for the same author in database
        const authorData = await Author.findOne({ name: args.author });
        // saving the book with the author id
        const book = new Book({ ...args, author: authorData.id });
        await book.save();
        return book.populate("author");
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated");
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.born;
      return author.save();
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      console.log(jwt.sign(userForToken, JWT_SECRET));
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`Server ready at ${url}`, typeof url);
});
