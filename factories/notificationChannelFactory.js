// factories/notificationFactory.js
const PushChannel = require('../channels/push');
const SMSChannel = require('../channels/sms');
const EmailChannel = require('../channels/email');

class NotificationFactory {
  static create(channelType) {
    switch (channelType) {
      case 'push':
        return new PushChannel();
      case 'sms':
        return new SMSChannel();
      case 'email':
        return new EmailChannel();
      default:
        throw new Error(`Unsupported channel type: ${channelType}`);
    }
  }
}

module.exports = NotificationFactory;
