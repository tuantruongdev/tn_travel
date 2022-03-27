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
const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "tour must have a name"],

    trim: true,
    maxlength: [100, "tour name must have less or equal than 40 characters"],
    minlength: [3, "tour name must have less or equal than 10 characters"],
  },
  overView: {
    type: String,
    required: [true, "localtion must have overview"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "must have image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});
//adding a mongo middleware pre save event
locationSchema.pre("save", function (next) {
  // this.slug = slugify(this.name, { lower: true }) + "-" + this.price;
  next();
});
const location = mongoose.model("location", locationSchema);
module.exports = location;
