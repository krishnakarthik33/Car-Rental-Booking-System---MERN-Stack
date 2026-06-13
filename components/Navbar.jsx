import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <nav
      className="
        navbar
        navbar-expand-lg
        navbar-dark
        bg-dark
        px-4
      "
    >

      <Link
        className="navbar-brand"
        to="/"
      >
        Car Rental
      </Link>

      <div className="ms-auto d-flex gap-2">

        {token && (
          <>
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? "btn btn-primary"
                  : "btn btn-outline-light"
              }
            >
              Home
            </Link>

            <Link
              to="/cars"
              className={
                location.pathname === "/cars"
                  ? "btn btn-primary"
                  : "btn btn-outline-light"
              }
            >
              Cars
            </Link>
          </>
        )}

        {token && (

          <Link
            to="/bookings"
            className={
              location.pathname === "/bookings"
                ? "btn btn-primary"
                : "btn btn-outline-light"
            }
          >
            My Bookings
          </Link>

        )}

        {user?.role === "admin" && (

          <Link
            to="/admin"
            className={
              location.pathname.startsWith("/admin")
                ? "btn btn-danger"
                : "btn btn-warning"
            }
          >
            Admin
          </Link>

        )}

        {!token ? (

          <>
            <Link
              to="/login"
              className={
                location.pathname === "/login"
                  ? "btn btn-success"
                  : "btn btn-outline-success"
              }
            >
              Login
            </Link>

            <Link
              to="/register"
              className={
                location.pathname === "/register"
                  ? "btn btn-primary"
                  : "btn btn-outline-primary"
              }
            >
              Register
            </Link>
          </>

        ) : (

          <>
            <span
              className="
                text-white
                align-self-center
              "
            >
              Welcome {user?.name}
            </span>

            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>

        )}

      </div>

    </nav>

  );

}

export default Navbar;