## Notification-service Design Implementation

### Getting Started
- Install Dependencies
```
npm install
```
- Setup .env with following variables
```
MONGO_PASSWORD=YOUR_MONGO_PASSWORD
MONGO_USERNAME=YOUR_MONGO_USERNAME
```
- Start the server
```
npm start
```

### About Design
<p>This notification service follows the below architecture which have the following components</p>

1. Client: These can be devices or external APIs trying to generate notifcation.
2. Server: Accept the incoming requests and send it to the notification APIs.
3. Notification Service:
- Core of the design responsible, to accept the incoming payload and generate notifications. 
- Responsible for creating notification channels as mentioned in request and performs the trigger. 
- It is assisted by Channels Factory which creates instances of different channels/mediums of nofitication. This follows factory design pattern to keep separation of different concerns.
- Saves the notification log into the database.
- APIs can interact with database and return the response.

![notifcation-service drawio](https://github.com/joharikushagra/sign-lens/assets/57484457/494acf6a-ce31-4519-9bca-499f8b1b56e9)

<center>Digram showing the interaction of various components</center>


![notifcation-service-2 drawio](https://github.com/joharikushagra/sign-lens/assets/57484457/b73d96da-2138-4a59-ad08-2beafcf0d305)

- The above design is a scalable version of former implementation.
- This follows inclusion of notification queue (RabbitMq, Kafka) which would get all the notifications requests from the service. 
- Multiple workers can be spawned to consume the entries from the queue and can perform operations and store them into the database distributing the load at scale.


### Routes
**GET**: 

`/notifications - getAllNotifications`

`/notifications/:id - getNotificationById`

**POST**:

`/notifications - createNotification`
```
Sample body for creating request
{
    recipient: 'abc@gmail.com',
    message: 'Get 30% off on all men's wear',
    channel: 'email'
}
```
**Note**: Channels are ['sms','email','push']

**PUT**

`/notifications/:id - updateNotificationStatusById`

**DELETE**

`/notifications/:id - deleteNotificationById`
