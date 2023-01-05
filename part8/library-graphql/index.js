require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const resolvers = require("./resolvers");
const typeDefs = require("./schema");

const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("mongo connection succcesssful");
});

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

const serverStart = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4002 },
  });
  console.log(`server ready at ${url}`);
};

serverStart();
