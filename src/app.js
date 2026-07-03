const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("This is our hello page");
});

app.use("/test", (req, res) => {
  res.send("This is our Test page");
});

app.use("/", (req, res) => {
  res.send(`This is home page`);
});

app.listen(8000, () => {
  console.log(`Server starting port ${8000}`);
});
