import { useEffect, useState } from "react";

import {
  getDashboardStats
} from "../api/adminApi";

import AdminLayout from "../components/AdminLayout";

function AdminDashboard() {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const data =
            await getDashboardStats();

          setStats(data);

        } catch (error) {

          console.error(error);

        }

      };

    fetchStats();

  }, []);

  if (!stats) {

    return (

      <AdminLayout>

        <h3>
          Loading...
        </h3>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <h1 className="mb-4">
        Admin Dashboard
      </h1>

      <div className="row g-4">

        <div className="col-md-3">

          <div className="card text-center shadow">

            <div className="card-body">

              <h5>
                Total Users
              </h5>

              <h2 className="dashboard-number">
                {stats.totalUsers}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card text-center shadow">

            <div className="card-body">

              <h5>
                Total Cars
              </h5>

              <h2 className="dashboard-number">
                {stats.totalCars}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card text-center shadow">

            <div className="card-body">

              <h5>
                Total Bookings
              </h5>

              <h2 className="dashboard-number">
                {stats.totalBookings}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card text-center shadow">

            <div className="card-body">

              <h5>
                Revenue
              </h5>

              <h2 className="dashboard-number">
                ₹{stats.revenue}
              </h2>

            </div>

          </div>

        </div>

      </div>

      <div className="row g-4 mt-3">

        <div className="col-md-4">

          <div className="card border-warning shadow">

            <div className="card-body">

              <h5>
                Pending Bookings
              </h5>

              <h3 className="dashboard-number">
                {stats.pendingBookings}
              </h3>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card border-success shadow">

            <div className="card-body">

              <h5>
                Confirmed Bookings
              </h5>

              <h3 className="dashboard-number">
                {stats.confirmedBookings}
              </h3>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card border-danger shadow">

            <div className="card-body">

              <h5>
                Cancelled Bookings
              </h5>

              <h3 className="dashboard-number">
                {stats.cancelledBookings}
              </h3>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

export default AdminDashboard;