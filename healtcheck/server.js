const express = require("express");
const app = express();

const HOST = "localhost";
const PORT = 27001;

app.get("/ping", (req, res) => {
  res.status(200).send("Alive");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


