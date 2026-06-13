const Booking = require("../models/Booking");
const Car = require("../models/Car");

const createBooking = async (req, res) => {
  try {
    const {
      carId,
      pickupDate,
      returnDate
    } = req.body;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        message: "Car not found"
      });
    }

    const existingBooking =
      await Booking.findOne({

        carId,

        status: {
          $in: ["pending", "confirmed"]
        },

        pickupDate: {
          $lt: new Date(returnDate)
        },

        returnDate: {
          $gt: new Date(pickupDate)
        }

      });

    if (existingBooking) {

      return res.status(400).json({
        message:
          "Car is already booked for selected dates"
      });

    }

    const pickup =
      new Date(pickupDate);

    const returning =
      new Date(returnDate);

    if (returning <= pickup) {
      return res.status(400).json({
        message:
          "Return date must be after pickup date"
      });
    }

    const difference =
      returning - pickup;

    const days =
      Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
      );

    const totalAmount =
      days * car.rentPerDay;

    const booking =
      await Booking.create({
        userId: req.user._id,
        carId,
        pickupDate,
        returnDate,
        days,
        totalAmount
      });

    res.status(201).json(booking);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user._id,
    }).populate("carId");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {

    const booking =
      await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    if (
      booking.userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    booking.status = "cancelled";

    await booking.save();

    res.json({
      message:
        "Booking cancelled successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking
};