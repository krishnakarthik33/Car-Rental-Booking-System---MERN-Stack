import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  return (
    <>
      <Navbar />

      <div className="container">

        {/* Hero Section */}

        <div className="text-center py-5">

          {token ? (

            <>
              <h1 className="display-3 fw-bold">
                Welcome Back,
                <span className="text-primary">
                  {" "} {user?.name}
                </span>
                👋
              </h1>

              <p className="lead text-muted mt-3">
                Ready for your next ride?
                Explore available cars and manage
                your bookings with ease.
              </p>

              <div className="mt-4">

                <Link
                  to="/cars"
                  className="btn btn-primary btn-lg me-3"
                >
                  Browse Cars
                </Link>

                <Link
                  to="/bookings"
                  className="btn btn-outline-primary btn-lg"
                >
                  My Bookings
                </Link>

              </div>

            </>

          ) : (

            <>
              <h1 className="display-3 fw-bold">
                Drive Your Dream Car Today
              </h1>

              <p className="lead text-muted mt-3">
                Premium cars at affordable prices.
                Book your ride in minutes.
              </p>

              <div className="mt-4">

                <Link
                  to="/login"
                  className="btn btn-primary btn-lg me-3"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-outline-primary btn-lg"
                >
                  Register
                </Link>

              </div>

            </>

          )}

        </div>

        {/* Features */}

        <div className="row text-center mt-5">

          <div className="col-md-4 mb-4">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body p-4">

                <h2>🚗</h2>

                <h5 className="fw-bold">
                  Wide Range of Cars
                </h5>

                <p className="text-muted">
                  Choose from hatchbacks,
                  sedans and SUVs.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body p-4">

                <h2>⚡</h2>

                <h5 className="fw-bold">
                  Instant Booking
                </h5>

                <p className="text-muted">
                  Book your favourite car
                  in just a few clicks.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body p-4">

                <h2>🔒</h2>

                <h5 className="fw-bold">
                  Secure & Reliable
                </h5>

                <p className="text-muted">
                  Safe booking process with
                  trusted vehicles.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Why Choose Us */}

        <div className="mt-5">

          <h2 className="text-center mb-4 fw-bold">
            Why Choose Us?
          </h2>

          <div className="row">

            <div className="col-md-6">

              <ul className="list-group shadow-sm">

                <li className="list-group-item">
                  ✅ Affordable Pricing
                </li>

                <li className="list-group-item">
                  ✅ Verified Cars
                </li>

                <li className="list-group-item">
                  ✅ Easy Booking Process
                </li>

              </ul>

            </div>

            <div className="col-md-6">

              <ul className="list-group shadow-sm">

                <li className="list-group-item">
                  ✅ 24/7 Customer Support
                </li>

                <li className="list-group-item">
                  ✅ Flexible Rental Plans
                </li>

                <li className="list-group-item">
                  ✅ Trusted By Customers
                </li>

              </ul>

            </div>

          </div>

        </div>

        {/* Quick Actions After Login */}

        {token && (

          <div className="mt-5">

            <h2 className="text-center mb-4 fw-bold">
              Quick Actions
            </h2>

            <div className="row">

              <div className="col-md-6 mb-3">

                <div className="card shadow-sm border-primary">

                  <div className="card-body text-center">

                    <h4>
                      Browse Cars
                    </h4>

                    <p>
                      Explore available cars
                      and make bookings.
                    </p>

                    <Link
                      to="/cars"
                      className="btn btn-primary"
                    >
                      View Cars
                    </Link>

                  </div>

                </div>

              </div>

              <div className="col-md-6 mb-3">

                <div className="card shadow-sm border-primary">

                  <div className="card-body text-center">

                    <h4>
                      My Bookings
                    </h4>

                    <p>
                      Track and manage your
                      bookings easily.
                    </p>

                    <Link
                      to="/bookings"
                      className="btn btn-primary"
                    >
                      View Bookings
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* Footer */}

        <footer className="text-center mt-5 mb-4">

          <hr />

          <p className="text-muted">
            © 2026 Car Rental System.
            All Rights Reserved.
          </p>

        </footer>

      </div>
    </>
  );
}

export default Home;