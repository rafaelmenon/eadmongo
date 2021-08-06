const express = require("express");
const mongoose = require("mongoose");
const morgan = require("mongoose-morgan");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morgan.token("body", (_req, _res) => JSON.stringify(_req.body));
morgan.token("ip", (req, _res) => req.socket.remoteAddress);
morgan.token("headers", (req, _res) => {
  return req.headers.token;
});

app.use(
  morgan(
    {
      collection: "logs",
      connectionString: `${process.env.DATABASE_CONNECTION_STRING}`,
      user: "root",
      pass: "b9sistema",
    },
    {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
    },
    ":date[iso], :body, :ip, :headers, :remote-user"
  )
);

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose default connection is open");
});

db.on("error", (err) => {
  console.log(`Mongoose default connection has occured \n${err}`);
});

db.on("disconnected", () => {
  console.log("Mongoose default connection is disconnected");
});

process.on("SIGINT", () => {
  db.close(() => {
    console.log(
      "Mongoose default connection is disconnected due application termination"
    );
    process.exit(0);
  });
});

// Load Models
const Users = require("./models/user.model");

// Load Routes
const login = require("./routes/authenticate.routes");
app.use("/v1/auth", login);

const users = require("./routes/users.routes");
app.use("/v1/users", users);

module.exports = app;
