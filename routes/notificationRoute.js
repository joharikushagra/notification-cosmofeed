const express = require("express");
const {
  deleteNotificationById,
  updateNotificationStatusById,
  createNotification,
  getNotificationById,
  getAllNotifications,
} = require("../controllers/notificationController");
const router = express.Router();

// Routes
// Get all notifications
router.get("/notifications", getAllNotifications);

// Get a notification by ID
router.get("/notifications/:id", getNotificationById);

// Create a new notification
router.post("/notifications", createNotification);

// Update a notification by ID
router.put("/notifications/:id", updateNotificationStatusById);

// Delete a notification by ID
router.delete("/notifications/:id", deleteNotificationById);

module.exports = router;
