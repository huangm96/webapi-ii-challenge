const express = require("express");

require('dotenv').config();

const secrets = require("./config/secrets.js");
const defaults = require("./config/default.js");

const postRouter = require('./post-router.js');

const server = express();

server.use(express.json());



server.get("/", (req, res) => {
  res.send(`server is working`);
});

server.use("/api/posts", postRouter);

server.listen(defaults.port, () => {
  console.log(
    `\n*** Server Running on http://localhost:${defaults.port} ***\n`
  );
});

