// npm install @apollo/server express graphql cors body-parser express-session cookie-parser connect-redis redis
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;
import typeDefs from "./graphql_schema/typeDefs/index.js";
import resolvers from "./graphql_schema/resolvers/index.js";

import cookieParser from "cookie-parser";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";

const app = express();

//if you run behind a proxy(e.g. nginx) set this to true
//app.set("trust proxy", true);

//session auth code------------------------

//    const { NODE_ENV, COOKIE_LIFETIME_IN_DAYS, SESSION_SECRET, SESS_NAME } =
//      process.env;
//    const IN_PROD = NODE_ENV === "production";
//
//    //Initialize client.
//    const client = createClient({});
//    await client.connect();
//    //Initialize store
//    let redisStore = new RedisStore({
//      client,
//    });
//
//    //Initialize session storage.
//    app.use(cookieParser());
//    app.use(
//      session({
//        store: redisStore,
//        name: SESS_NAME,
//        resave: false, // required: force lightweight session keep alive (touch)
//        saveUninitialized: false, // recommended: only save session when data exists
//        secret: SESSION_SECRET,
//        //rolling: true,
//        cookie: {
//          maxAge: 1000 * 60 * 60 * 24 * parseInt(COOKIE_LIFETIME_IN_DAYS),
//          secure: IN_PROD,
//          httpOnly: true,
//          sameSite: "lax",
//        },
//      }),
//    );

//session auth code------------------------

app.disable("x-powered-by");

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  csrfPrevention: true,
  cache: "bounded",
});
await server.start();

app.use(
  "/",
  cors({
    origin: "*",
    credentials: true,
  }),
  json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ token: req.headers.token, req, res }),
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
