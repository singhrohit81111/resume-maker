const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/v1");
const errorMiddleware = require("./middlewares");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16Kb" }));

app.use("/", userRoutes);
app.use(errorMiddleware);

module.exports = app;
