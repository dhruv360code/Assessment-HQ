const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.disable("x-powered-by");
app.use(cookieParser());

const routes = require("./routes");
const expressValidate = require("../src/middlewares/express-validator");

app.use("/api", expressValidate, routes.apiRoutes);
app.use("/auth", expressValidate, routes.authRoutes);

module.exports = app;