const mongoose = require("mongoose");
const dotenv = require("dotenv");
const slugify = require("slugify");

dotenv.config({ path: "./config.env" });
const dbString = process.env.DB_CONNECT_STRING.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);
mongoose
  .connect(dbString, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection was succesful");
  });

const requestSchema = mongoose.Schema({
  tourId: {
    type: String,
    required: [true, "request must have a tourId"],
  },
  userId: {
    type: String,
    required: [true, "request must have a userId"],
  },
  requestAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: Number,
    //1:waiting 2:canceled 3:rejected 4:accepted
    enum: [1, 2, 3, 4],
    default: 1,
  },
});
const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
