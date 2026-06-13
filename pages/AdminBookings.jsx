import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";

import {
  getAllBookings,
  confirmBooking,
  cancelBooking,
} from "../api/adminApi";

function AdminBookings() {

  const [bookings, setBookings] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const fetchBookings =
    async () => {

      try {

        const data =
          await getAllBookings();

        setBookings(data);

      } catch (error) {

        console.error(error);

      }

    };

  useEffect(() => {

    fetchBookings();

  }, []);

  const handleConfirm =
    async (id) => {

      const confirmAction =
        window.confirm(
          "Confirm this booking?"
        );

      if (!confirmAction) return;

      try {

        await confirmBooking(id);

        alert(
          "Booking Confirmed"
        );

        fetchBookings();

      } catch (error) {

        console.error(error);

      }

    };

  const handleCancel =
    async (id) => {

      const confirmAction =
        window.confirm(
          "Cancel this booking?"
        );

      if (!confirmAction) return;

      try {

        await cancelBooking(id);

        alert(
          "Booking Cancelled"
        );

        fetchBookings();

      } catch (error) {

        console.error(error);

      }

    };

  const filteredBookings =
    bookings.filter((booking) => {

      const searchText =
        search.toLowerCase();

      const matchesSearch =

        booking.userId?.name
          ?.toLowerCase()
          .includes(searchText)

        ||

        booking.userId?.email
          ?.toLowerCase()
          .includes(searchText)

        ||

        booking.carId?.brand
          ?.toLowerCase()
          .includes(searchText)

        ||

        booking.carId?.model
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =

        statusFilter === "all"

        ||

        booking.status ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });

  const pendingCount =
    bookings.filter(
      (booking) =>
        booking.status ===
        "pending"
    ).length;

  const confirmedCount =
    bookings.filter(
      (booking) =>
        booking.status ===
        "confirmed"
    ).length;

  const cancelledCount =
    bookings.filter(
      (booking) =>
        booking.status ===
        "cancelled"
    ).length;

  const getBadgeClass =
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

      return "bg-warning";

    };

    console.log("ADMIN BOOKINGS PAGE LOADED");


  return (

    <AdminLayout>

      <h1>BOOKINGS PAGE TEST</h1>

      <div className="row mb-4">

        <div className="col-md-3">

          <div className="card shadow">

            <div className="card-body text-center">

              <h5>
                Total Bookings
              </h5>

              <h2>
                {bookings.length}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow border-warning">

            <div className="card-body text-center">

              <h5>
                Pending
              </h5>

              <h2>
                {pendingCount}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow border-success">

            <div className="card-body text-center">

              <h5>
                Confirmed
              </h5>

              <h2>
                {confirmedCount}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow border-danger">

            <div className="card-body text-center">

              <h5>
                Cancelled
              </h5>

              <h2>
                {cancelledCount}
              </h2>

            </div>

          </div>

        </div>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <div className="row mb-3">

            <div className="col-md-8">

              <input
                type="text"
                className="form-control"
                placeholder="Search bookings..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="col-md-4">

              <select
                className="form-select"
                value={
                  statusFilter
                }
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >

                <option value="all">
                  All Status
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="confirmed">
                  Confirmed
                </option>

                <option value="cancelled">
                  Cancelled
                </option>

              </select>

            </div>

          </div>

          <table className="table table-hover">

            <thead>

              <tr>

                <th>User</th>

                <th>Car</th>

                <th>Pickup</th>

                <th>Return</th>

                <th>Days</th>

                <th>Amount</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredBookings.length > 0 ? (

                filteredBookings.map(
                  (booking) => (

                    <tr
                      key={
                        booking._id
                      }
                    >

                      <td>
                        {
                          booking.userId
                            ?.name
                        }
                      </td>

                      <td>
                        {
                          booking.carId
                            ?.brand
                        }{" "}
                        {
                          booking.carId
                            ?.model
                        }
                      </td>

                      <td>
                        {new Date(
                          booking.pickupDate
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        {new Date(
                          booking.returnDate
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        {
                          booking.days
                        }
                      </td>

                      <td>
                        ₹
                        {
                          booking.totalAmount
                        }
                      </td>

                      <td>

                        <span
                          className={`badge ${getBadgeClass(
                            booking.status
                          )}`}
                        >
                          {
                            booking.status
                          }
                        </span>

                      </td>

                      <td>

                        {booking.status ===
                          "pending" && (
                          <>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                handleConfirm(
                                  booking._id
                                )
                              }
                            >
                              Confirm
                            </button>

                            <button
                              className="btn btn-danger btn-sm ms-2"
                              onClick={() =>
                                handleCancel(
                                  booking._id
                                )
                              }
                            >
                              Cancel
                            </button>
                          </>
                        )}

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center"
                  >
                    No bookings found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default AdminBookings;