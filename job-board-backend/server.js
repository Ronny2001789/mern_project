require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const isAuth = require("./middleware/is-auth");

const graphQlSchema = require("./graphql/schema");
const graphQlResolvers = require("./graphql/resolvers");

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// CORS setup
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Use specific domain in production
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Auth middleware (attaches isAuth & userId to req)
app.use(isAuth);

app.use(bodyParser.json());
// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true, // Dev tool to test queries
  })
);

// MongoDB URI
const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gxl9tau.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(8000, () => {
      console.log(" Server running at http://localhost:8000/graphql");
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });
