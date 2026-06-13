const User = require("../models/User");
const Car = require("../models/Car");
const Booking = require("../models/Booking");

const getAllUsers = async (req, res) => {

  try {

    const users =
      await User.find()
      .select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


const deleteUser = async (req, res) => {

  try {

    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    await user.deleteOne();

    res.json({
      message:
        "User deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const updateUserRole = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    user.role = req.body.role;

    await user.save();

    res.json({
      message:
        "User role updated successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


const getAllBookings = async (req, res) => {

  try {

    const bookings =
      await Booking.find()
      .populate("userId", "name email")
      .populate("carId");

    res.json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const confirmBooking = async (req, res) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    booking.status = "confirmed";

    await booking.save();

    res.json({
      message:
        "Booking confirmed successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const adminCancelBooking = async (req, res) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
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

const getDashboardStats =
async (req, res) => {

  try {

    const totalUsers =
      await User.countDocuments();

    const totalCars =
      await Car.countDocuments();

    const totalBookings =
      await Booking.countDocuments();

    const pendingBookings =
      await Booking.countDocuments({
        status: "pending"
      });

    const confirmedBookings =
      await Booking.countDocuments({
        status: "confirmed"
      });

    const cancelledBookings =
      await Booking.countDocuments({
        status: "cancelled"
      });

    const confirmed =
      await Booking.find({
        status: "confirmed"
      });

    const revenue =
      confirmed.reduce(
        (sum, booking) =>
          sum + booking.totalAmount,
        0
      );

    res.json({

      totalUsers,

      totalCars,

      totalBookings,

      pendingBookings,

      confirmedBookings,

      cancelledBookings,

      revenue

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllBookings,
  confirmBooking,
  adminCancelBooking,
  getDashboardStats
};