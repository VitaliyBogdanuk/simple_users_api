const express = require("express");
const usersRouter = require("./routes/users");

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Simple API is running" });
});

app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

module.exports = app;
