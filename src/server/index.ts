// const { handleUCS } = require("./controllers/UniformCostSearch");
const { handleUCS } = require("./controllers/UniformCostSearch");
const express = require("express");

const app = express();
const port = 5000;

app.route("/").get(handleUCS);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export {};
