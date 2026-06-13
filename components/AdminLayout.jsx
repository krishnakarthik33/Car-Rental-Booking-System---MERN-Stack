import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

function AdminLayout({ children }) {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="container-fluid">

      <div className="row">

        <div
          className="
            col-md-2
            bg-dark
            text-white
            min-vh-100
            p-3
          "
        >

          <h4>
            Admin Panel
          </h4>

          <hr />

          <div className="d-flex flex-column gap-2">

            <Link
              to="/admin"
              className={
                location.pathname === "/admin"
                  ? "btn btn-primary"
                  : "btn btn-outline-light"
              }
            >
              Dashboard
            </Link>

            <Link
              to="/admin/users"
              className={
                location.pathname === "/admin/users"
                  ? "btn btn-primary"
                  : "btn btn-outline-light"
              }
            >
              Users
            </Link>

            <Link
              to="/admin/cars"
              className={
                location.pathname === "/admin/cars"
                  ? "btn btn-primary"
                  : "btn btn-outline-light"
              }
            >
              Cars
            </Link>

            <Link
              to="/admin/bookings"
              className={
                location.pathname === "/admin/bookings"
                  ? "btn btn-primary"
                  : "btn btn-outline-light"
              }
            >
              Bookings
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-danger mt-3"
            >
              Logout
            </button>

          </div>

        </div>

        <div className="col-md-10 p-4">

          {children}

        </div>

      </div>

    </div>

  );

}

export default AdminLayout;