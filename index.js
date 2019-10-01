const express = require("express");

const postRouter = require('./post-router.js');

const server = express();

server.use(express.json());



server.get("/", (req, res) => {
  res.send(`server is working`);
});

server.use("/api/posts", postRouter);

server.listen(8787, () => {
  console.log("\n*** Server Running on http://localhost:8787 ***\n");
});

