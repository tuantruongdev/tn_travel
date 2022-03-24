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
  overView: {
    type: String,
    required: [true, "tour must have overview"],
  },
  description: {
    type: String,
    trim: true,
  },

  slug: String,
  locationId: {
    type: String,
    required: [true, "tour must have location id"],
  },
  location: { type: Object, default: undefined },

  duration: {
    type: Number,
    required: [true, "tour must have a durations"],
  },
  price: {
    type: Number,
    trim: true,
    default: 0,
  },
  recommend: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "good",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDate: { type: Date },
  summitedList: {
    type: Array,
    default: [],
  },
  waitingList: {
    type: Array,
    default: [],
  },
});
//adding a mongo middleware pre save event
tourSchema.pre("save", function (next) {
  this.slug = `${slugify(this.name, { lower: true })}-${this.price}`;
  next();
});
const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
