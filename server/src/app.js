const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/v1");
const errorMiddleware = require("./middlewares");
const  resumeRoutes = require("./routes/v2");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16Kb" }));

app.use("/api/v1", authRoutes);
app.use('/api/v2/resume',resumeRoutes);


module.exports = app;
