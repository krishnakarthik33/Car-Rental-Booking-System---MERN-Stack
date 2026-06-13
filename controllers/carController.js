const Car = require("../models/Car");

const addCar = async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      fuelType,
      transmission,
      seats,
      color,
      rentPerDay
    } = req.body;

    if (
      !brand ||
      !model ||
      !year ||
      !fuelType ||
      !transmission ||
      !seats ||
      !color ||
      !rentPerDay
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const car = await Car.create({
      brand,
      model,
      year,
      fuelType,
      transmission,
      seats,
      color,
      rentPerDay
    });

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getCars = async (req, res) => {
  try {

    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 5;

    const skip =
      (page - 1) * limit;

    let sortOption = {};

    if (req.query.sort) {

      sortOption[
        req.query.sort.replace("-", "")
      ] = req.query.sort.startsWith("-")
        ? -1
        : 1;

    }

    const {
      search,
      fuelType,
      transmission,
      minPrice,
      maxPrice
    } = req.query;

    let query = {};

    if (search) {
      query.brand = {
        $regex: search,
        $options: "i"
      };
    }

    if (fuelType) {
      query.fuelType = fuelType;
    }

    if (transmission) {
      query.transmission = transmission;
    }

    if (minPrice || maxPrice) {

      query.rentPerDay = {};

      if (minPrice) {
        query.rentPerDay.$gte =
          Number(minPrice);
      }

      if (maxPrice) {
        query.rentPerDay.$lte =
          Number(maxPrice);
      }
    }

    const cars =
      await Car.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    const totalCars =
      await Car.countDocuments(query);

    res.json({
      currentPage: page,
      totalPages:
        Math.ceil(totalCars / limit),
      totalCars,
      cars
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: "Car not found"
      });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateCar = async (req, res) => {
  try {

    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: "Car not found"
      });
    }

    const updatedCar =
      await Car.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    res.json(updatedCar);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const deleteCar = async (req, res) => {
  try {

    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: "Car not found"
      });
    }

    await car.deleteOne();

    res.json({
      message: "Car deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const toggleAvailability = async (
  req,
  res
) => {

  try {

    const car =
      await Car.findById(
        req.params.id
      );

    if (!car) {

      return res.status(404).json({
        message: "Car not found"
      });

    }

    car.available =
      !car.available;

    await car.save();

    res.json({
      message:
        "Availability updated",
      car
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};




module.exports = {
  addCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  toggleAvailability
};