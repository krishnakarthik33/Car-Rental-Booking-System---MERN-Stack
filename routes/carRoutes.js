const express = require("express");

const router = express.Router();

const {
  addCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  toggleAvailability
} = require("../controllers/carController");

const {
  protect
} = require("../middleware/authMiddleware");

const {
  adminOnly
} = require("../middleware/adminMiddleware");

router.get("/", getCars);

router.get("/:id", getCarById);

router.post(
  "/",
  protect,
  adminOnly,
  addCar
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateCar
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteCar
);

router.patch(
  "/:id/availability",
  protect,
  adminOnly,
  toggleAvailability
);


module.exports = router;