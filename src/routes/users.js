const express = require("express");
const User = require("../models/User");
const logger = require("../utils/logger");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    logger.info("User created", { id: user._id, email: user.email });
    return res.status(201).json(user);
  } catch (error) {
    logger.error("Create user failed", { message: error.message });
    return res.status(400).json({ message: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    logger.error("List users failed", { message: error.message });
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      logger.warn("User not found", { id: req.params.id });
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    logger.error("Get user failed", { id: req.params.id, message: error.message });
    return res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      logger.warn("User not found for update", { id: req.params.id });
      return res.status(404).json({ message: "User not found" });
    }

    logger.info("User updated", { id: user._id });
    return res.status(200).json(user);
  } catch (error) {
    logger.error("Update user failed", { id: req.params.id, message: error.message });
    return res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      logger.warn("User not found for delete", { id: req.params.id });
      return res.status(404).json({ message: "User not found" });
    }

    logger.info("User deleted", { id: req.params.id });
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    logger.error("Delete user failed", { id: req.params.id, message: error.message });
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
