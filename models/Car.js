const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true
    },

    model: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    fuelType: {
      type: String,
      required: true
    },

    transmission: {
      type: String,
      required: true
    },

    seats: {
      type: Number,
      required: true
    },

    color: {
      type: String,
      required: true
    },

    rentPerDay: {
      type: Number,
      required: true
    },

    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Car", carSchema);