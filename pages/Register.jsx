import { useState } from "react";
import { registerUser } from "../api/authApi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function RegisterPage() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          await registerUser({
            name,
            email,
            password,
          });

        alert(data.message);

      } catch (err) {

        alert(
          err.response?.data?.message ||
          "Registration Failed"
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
                  Register
                </h2>

                <form
                  onSubmit={
                    handleRegister
                  }
                >

                  <div className="mb-3">

                    <label className="form-label">
                      Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) =>
                        setName(
                          e.target.value
                        )
                      }
                    />

                  </div>

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
                    className="btn btn-success w-100"
                  >
                    Register
                  </button>

                </form>

                <p className="text-center mt-3">

                  Already have an account?

                  {" "}

                  <Link to="/login">
                    Login
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

export default RegisterPage;