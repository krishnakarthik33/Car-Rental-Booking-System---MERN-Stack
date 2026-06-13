import { useEffect, useState } from "react";
import {
  getMyBookings,
  cancelBooking,
} from "../api/bookingApi";

import Navbar from "../components/Navbar";

const MyBookings = () => {

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings =
    async () => {

      try {

        const data =
          await getMyBookings();

        setBookings(data);

      } catch (error) {

        console.error(error);

      }

    };

  const handleCancel =
    async (bookingId) => {

      const confirmCancel =
        window.confirm(
          "Cancel this booking?"
        );

      if (!confirmCancel) return;

      try {

        await cancelBooking(
          bookingId
        );

        fetchBookings();

      } catch (error) {

        console.error(error);

      }

    };

  const getStatusBadge =
    (status) => {

      if (
        status === "confirmed"
      ) {
        return "bg-success";
      }

      if (
        status === "cancelled"
      ) {
        return "bg-danger";
      }

      return "bg-warning text-dark";
    };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            My Bookings
          </h1>

          <p className="text-muted">
            View and manage all your bookings
          </p>

        </div>

        {bookings.length === 0 ? (

          <div className="card shadow">

            <div className="card-body text-center">

              <h4>
                No Bookings Found
              </h4>

              <p className="text-muted">
                Start by booking a car.
              </p>

            </div>

          </div>

        ) : (

          <div className="row">

            {bookings.map(
              (booking) => (

                <div
                  key={booking._id}
                  className="col-md-6 mb-4"
                >

                  <div className="card shadow h-100">

                    <div className="card-body">

                      <div className="d-flex justify-content-between align-items-center">

                        <h4 className="fw-bold">

                          {
                            booking.carId?.brand
                          }{" "}
                          {
                            booking.carId?.model
                          }

                        </h4>

                        <span
                          className={`badge ${getStatusBadge(
                            booking.status
                          )}`}
                        >
                          {
                            booking.status
                          }
                        </span>

                      </div>

                      <hr />

                      <p>
                        <strong>
                          Year:
                        </strong>{" "}
                        {
                          booking.carId?.year
                        }
                      </p>

                      <p>
                        <strong>
                          Fuel:
                        </strong>{" "}
                        {
                          booking.carId?.fuelType
                        }
                      </p>

                      <p>
                        <strong>
                          Seats:
                        </strong>{" "}
                        {
                          booking.carId?.seats
                        }
                      </p>

                      <p>
                        <strong>
                          Pickup:
                        </strong>{" "}
                        {new Date(
                          booking.pickupDate
                        ).toLocaleDateString()}
                      </p>

                      <p>
                        <strong>
                          Return:
                        </strong>{" "}
                        {new Date(
                          booking.returnDate
                        ).toLocaleDateString()}
                      </p>

                      <p>
                        <strong>
                          Days:
                        </strong>{" "}
                        {
                          booking.days
                        }
                      </p>

                      <h5 className="text-success">

                        ₹
                        {
                          booking.totalAmount
                        }

                      </h5>

                    </div>

                    <div className="card-footer bg-white border-0">

                      {booking.status !==
                        "cancelled" && (

                        <button
                          className="btn btn-danger w-100"
                          onClick={() =>
                            handleCancel(
                              booking._id
                            )
                          }
                        >
                          Cancel Booking
                        </button>

                      )}

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </>
  );

};

export default MyBookings;