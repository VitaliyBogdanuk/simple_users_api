const express = require("express");
const morgan = require("morgan");
const usersRouter = require("./routes/users");
const logger = require("./utils/logger");

const app = express();

app.use(
  morgan("combined", {
    stream: {
      write: (msg) => logger.info("HTTP", { log: msg.trim() }),
    },
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Simple API is running" });
});

app.get("/api/health/db", async (_req, res) => {
  const mongoose = require("mongoose");
  try {
    const state = mongoose.connection.readyState;
    if (state !== 1) {
      const states = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
      logger.warn("DB health check failed", { state: states[state] ?? "unknown" });
      return res.status(503).json({
        ok: false,
        message: "Database not connected",
        state: states[state] ?? "unknown",
      });
    }
    await mongoose.connection.db.admin().command({ ping: 1 });
    return res.status(200).json({ ok: true, message: "Database connection OK" });
  } catch (error) {
    logger.error("DB health check error", { message: error.message });
    return res.status(503).json({
      ok: false,
      message: "Database error",
      error: error.message,
    });
  }
});

app.use("/api/users", usersRouter);

app.use((req, res) => {
  logger.warn("Route not found", { path: req.originalUrl });
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

module.exports = app;
