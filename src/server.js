const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const logger = require("./utils/logger");

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  logger.error("MONGODB_URI is not set in .env");
  process.exit(1);
}

mongoose.connection.on("error", (err) => {
  logger.error("MongoDB connection error (event)", { message: err.message });
});

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  logger.info("MongoDB reconnected");
});

const mongooseOptions = {
  serverSelectionTimeoutMS: 10000,
  maxPoolSize: 10,
};

mongoose
  .connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    logger.info("MongoDB connected");
    app.listen(PORT, () => {
      logger.info("Server started", { port: PORT });
    });
  })
  .catch((error) => {
    logger.error("MongoDB connection error", {
      message: error.message,
      name: error.name,
    });
    process.exit(1);
  });
