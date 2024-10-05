const mongoose = require("mongoose");

// mongoDB URL
// const mongoURL = "mongodb://localhost:27017/hotels";
require("dotenv").config();

const mongoURL = process.env.MONGODB_URL_LOCAL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// { useNewUrlParser: true, useUnifiedTopology: true }:
// This object specifies options for the connection:

// 1. useNewUrlParser: true: This option is used to avoid deprecation warnings related to the URL parser. It's recommended to set it to true.
// 2. useUnifiedTopology: true: This option is used to enable the new, recommended topology for connecting to MongoDB. It's also recommended to set it to true.

// In summary:
// 1. The code connects to a MongoDB database using the specified mongoURL.
// 2. It sets the useNewUrlParser and useUnifiedTopology options to ensure compatibility and avoid deprecation warnings.
// 3. Once the connection is established, you can use Mongoose to interact with the MongoDB database, create models, and perform CRUD (Create, Read, Update, Delete) operations on your data.

const db = mongoose.connection;
// adding event listner : when the databse is connected then this message will be displayed & other event Listener
db.on("connected", () => {
  console.log("Connected to MongoDB server");
});
db.on("error", (err) => {
  console.log("MongoDB connection error :", err);
});
db.on("disconnected", () => {
  console.log("Disconnected to MongoDB server");
});

// Export dataBase connection
module.export = db;

// ReURLConnectConnectionEventExport : Re-URL-Connect-Connection-Event-Export

// first 3 : Re-URL-Connect : Mongoose
// last 3 : Connection-Event-Export : for the DB connection
