const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const req = require("express/lib/request");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const tourRoute = require("./routes/tourRoute");
const userRoute = require("./routes/userRoute");
const AppError = require("./utils/appError");

const globalErrHandler = require("./controller/errorController");

function getcookie(req) {
  if (req.headers.cookie) {
    const cookie = req.headers.cookie;
    //console.log(cookie);
    return cookie.split("; ");
  }
}

dotenv.config({ path: "./config.env" });
const app = express();

app.use(cors({ credentials: true, origin: "http://127.0.0.1:5555" }));
app.use(helmet());

const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: "too many request from this ip, Please try again later",
});

app.use("/api", limiter);
app.use(express.json());

//data protect form nosql query
app.use(mongoSanitize());
//data protect against xss
app.use(xss());

app.use("*", (req, res, next) => {
  const cookie = getcookie(req);
  if (cookie) {
    req.jwt = cookie;
  }

  // console.log(cookie);
  next();
});
app.use(hpp({ whitelist: ["duration"] }));
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`acan't find ${req.originalUrl} on this server`));
});
app.use(globalErrHandler);
module.exports = app;
