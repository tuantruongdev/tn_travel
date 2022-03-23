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
const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "tour must have a name"],

    trim: true,
    maxlength: [40, "tour name must have less or equal than 40 characters"],
    minlength: [10, "tour name must have less or equal than 10 characters"],
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, "tour must have a durations"],
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    default: "good",
  },
  imageCover: {
    type: String,
    required: [true, "must have image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: { type: Date },
});
//adding a mongo middleware pre save event
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
