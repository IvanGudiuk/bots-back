const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/user");

const app = express();

// Logger setup
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(
  cors({
    origin: "https://bybit-screeners.online/",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.use((req, res, next) => {
//   res.setHeader("Permissions-Policy", "interest-cohort=()");
//   next();
// });

// Routes
app.use("/users", userRouter);

// Catch non-existent routes
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  console.error(err); // Log the error for server-side inspection
  res.status(status).json({ message });
});

module.exports = app;
