const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllBookings,
  confirmBooking,
  adminCancelBooking,
  getDashboardStats
} = require(
  "../controllers/adminController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const {
  adminOnly
} = require(
  "../middleware/adminMiddleware"
);

router.use(
  protect,
  adminOnly
);

router.get(
  "/users",
  getAllUsers
);

router.delete(
  "/users/:id",
  deleteUser
);

router.patch(
  "/users/:id/role",
  updateUserRole
);

router.get(
  "/bookings",
  getAllBookings
);

router.get(
  "/dashboard",
  getDashboardStats
);

router.patch(
  "/bookings/:id/confirm",
  confirmBooking
);

router.patch(
  "/bookings/:id/cancel",
  adminCancelBooking
);

module.exports = router;