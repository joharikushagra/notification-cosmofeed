// services/notificationService.js
const NotificationChannelFactory = require("../factories/notificationChannelFactory");
const NotificationLog = require("../models/notificationLog");

class NotificationService {
  constructor() {
    this._channels = [{ type: "push" }, { type: "sms" }, { type: "email" }];
  }

  async sendNotification(user, message, type) {
    // Iterate through channels and send notification
      const channel = NotificationChannelFactory.create(type);
      await this.retrySendNotification(user, message, channel, type);
  }

  async retrySendNotification(
    recipient,
    message,
    channel,
    type,
    retryCount = 3
  ) {
    try {
      await channel.send(message, recipient);
      await this.logDelivery(message, recipient, type, true);
    } catch (error) {
      console.error(`Error sending ${channel.constructor.name}:`, error);
      if (retryCount > 0) {
        console.log(`Retrying ${channel.constructor.name}...`);
        await this.retrySendNotification(
          recipient,
          message,
          channel,
          type,
          retryCount - 1
        );
      } else {
        console.error(
          `Failed to send ${channel.constructor.name} after retries`
        );
        await this.logDelivery(message, recipient, type, false);
      }
    }
  }

  async logDelivery(message, recipient, channel, success) {
    try {
      await NotificationLog.create({
        message,
        recipient,
        channel,
        success,
        timestamp: new Date(),
      });
      console.log("Delivery logged");
    } catch (error) {
      console.error("Error logging delivery:", error);
    }
  }
}

module.exports = NotificationService;
