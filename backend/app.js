require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const path = require("path");

const port = 3001;
const app = express();

app.use(express.static("../frontend/my-app/build"));
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "frontend", "my-app", "build", "index.html"));
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
