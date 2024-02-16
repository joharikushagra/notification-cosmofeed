const express = require("express");
const morgan = require("morgan");
const { createLogger, format, transports } = require("winston");
const cors = require("cors");
const router = require("./routes/notificationRoute");
require('dotenv').config();
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

// Logger
const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" }),
  ],
});

//DB Connect
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.w2lg8.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(router);

// Error handler
app.use((err, req, res, next) => {
  logger.error({ message: "Error occurred", error: err.stack });
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
