require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/user");

const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");

const JWT_SECRET = process.env.JWT_SECRET;
console.log(process.env.JWT_SECRET);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("mongo connection succcesssful");
});

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
          const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
          const currentUser = await User.findById(decodedToken.id);
          return { currentUser };
        }
      },
    })
  );

  const PORT = 4002;
  httpServer.listen(PORT, () => console.log(`running on ${PORT}`));
};

start();
