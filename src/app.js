const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "5mb", extended: true }));

const routes = require("./routes");

app.use("/api", routes.apiRoutes);
app.use("/auth", routes.authRoutes);

module.exports = app;
