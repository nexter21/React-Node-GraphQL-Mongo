const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./Schemas");

const app = express();
const PORT = 5000;

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

mongoose
  .connect("mongodb://localhost:27017/gql-crud-apollo")
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running");
    });
  })
  .catch((err) => console.log(err));
