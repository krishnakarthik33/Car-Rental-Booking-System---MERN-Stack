import { useEffect, useState } from "react";
import { getCars } from "../api/carApi";
import { createBooking } from "../api/bookingApi";
import Navbar from "../components/Navbar";

function CarsPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const data = await getCars();
      setCars(data.cars);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async (carId) => {
    const pickupDate = prompt(
      "Enter Pickup Date (YYYY-MM-DD)"
    );

    const returnDate = prompt(
      "Enter Return Date (YYYY-MM-DD)"
    );

    if (!pickupDate || !returnDate) {
      return;
    }

    try {
      await createBooking({
        carId,
        pickupDate,
        returnDate,
      });

      alert("Booking Created Successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Booking Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="text-center mb-5">
          <h1 className="fw-bold">
            Available Cars
          </h1>

          <p className="text-muted">
            Choose your favourite car and book instantly
          </p>
        </div>

        <div className="row">

          {cars.map((car) => (

            <div
              key={car._id}
              className="col-md-4 mb-4"
            >

              <div className="card shadow h-100">

                <div className="card-body">

                  <h4 className="card-title fw-bold">
                    {car.brand} {car.model}
                  </h4>

                  <hr />

                  <p>
                    <strong>Year:</strong>{" "}
                    {car.year}
                  </p>

                  <p>
                    <strong>Fuel:</strong>{" "}
                    {car.fuelType}
                  </p>

                  <p>
                    <strong>Transmission:</strong>{" "}
                    {car.transmission}
                  </p>

                  <p>
                    <strong>Seats:</strong>{" "}
                    {car.seats}
                  </p>

                  <p>
                    <strong>Color:</strong>{" "}
                    {car.color}
                  </p>

                  <h5 className="text-success">
                    ₹{car.rentPerDay}/day
                  </h5>

                  <div className="mt-3">

                    {car.available ? (
                      <span className="badge bg-success">
                        Available
                      </span>
                    ) : (
                      <span className="badge bg-danger">
                        Unavailable
                      </span>
                    )}

                  </div>

                </div>

                <div className="card-footer bg-white border-0">

                  <button
                    className="btn btn-primary w-100"
                    disabled={!car.available}
                    onClick={() =>
                      handleBooking(car._id)
                    }
                  >
                    Book Now
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default CarsPage;