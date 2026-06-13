import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const data =
        await loginUser({
          email,
          password,
        });

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login Successful");

      if (
        data.user.role === "admin"
      ) {

        navigate("/admin");

      } else {

        navigate("/");

      }

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="row justify-content-center mt-5">

          <div className="col-md-5">

            <div className="card shadow">

              <div className="card-body p-4">

                <h2 className="text-center mb-4">
                  Login
                </h2>

                <form
                  onSubmit={handleLogin}
                >

                  <div className="mb-3">

                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                    />

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                    />

                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Login
                  </button>

                </form>

                <p className="text-center mt-3">

                  Don't have an account?

                  {" "}

                  <Link to="/register">
                    Register
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default LoginPage;