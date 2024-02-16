const NotificationLog = require("../models/notificationLog");
const NotificationService = require("../services/notificationService");

// Notification Service instance
const notificationService = new NotificationService();

exports.getAllNotifications = async (req, res, next) => {
  try {
    const notifications = await NotificationLog.find();
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

exports.getNotificationById = async (req, res, next) => {
  try {
    const notification = await NotificationLog.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

exports.createNotification = async (req, res, next) => {
  //   const { message, channels } = req.body;
  const { recipient, message, channel } = req.body;
  try {
    await notificationService.sendNotification(recipient, message, channel);
    const notification = new NotificationLog({
      recipient,
      message,
      channel,
      success: true,
    });
    res.status(201).json({message: 'Notification created', data: notification});
  } catch (error) {
    next(error);
  }
};

exports.updateNotificationStatusById = async (req, res, next) => {
  const updatedPayload = req.body;
  try {
    const notification = await NotificationLog.findByIdAndUpdate(
      req.params.id,
      { ...updatedPayload },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

exports.deleteNotificationById = async (req, res, next) => {
  try {
    const notification = await NotificationLog.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(204).json(notification);
  } catch (error) {
    next(error);
  }
};
