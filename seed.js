const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Car = require("./models/Car");

const seedDatabase = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB Connected"
    );

    // Remove old sample data

    await User.deleteMany({
      role: "admin"
    });

    await Car.deleteMany({});

    // Create Admin

    const hashedPassword =
      await bcrypt.hash(
        "admin123",
        10
      );

    await User.create({

      name: "Admin",

      email:
        "admin@gmail.com",

      password:
        hashedPassword,

      role: "admin"

    });

    console.log(
      "Admin Created"
    );

    // Sample Cars

    await Car.insertMany([

      {
        brand: "BMW",
        model: "X5",
        year: 2024,
        fuelType: "diesel",
        transmission:
          "automatic",
        seats: 5,
        color: "Black",
        rentPerDay: 5000
      },

      {
        brand: "Audi",
        model: "A6",
        year: 2023,
        fuelType: "petrol",
        transmission:
          "automatic",
        seats: 5,
        color: "White",
        rentPerDay: 4500
      },

      {
        brand: "Mercedes",
        model: "C-Class",
        year: 2024,
        fuelType: "diesel",
        transmission:
          "automatic",
        seats: 5,
        color: "Gray",
        rentPerDay: 5500
      }

    ]);

    console.log(
      "Cars Created"
    );

    console.log(
      "Database Seeded Successfully"
    );

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);

  }

};

seedDatabase();