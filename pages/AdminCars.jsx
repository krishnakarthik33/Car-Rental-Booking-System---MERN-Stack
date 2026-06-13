import { useEffect, useState } from "react";

import {
  getAllCars,
  deleteCar,
  addCar,
  updateCar,
  toggleAvailability
} from "../api/adminApi";

import AdminLayout from "../components/AdminLayout";

function AdminCars() {

  const [cars, setCars] = useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({});

  const [formData, setFormData] =
    useState({
      brand: "",
      model: "",
      year: "",
      fuelType: "",
      transmission: "",
      seats: "",
      color: "",
      rentPerDay: "",
    });

  const fetchCars = async () => {

    try {

      const data =
        await getAllCars();

      setCars(data.cars);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchCars();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleAddCar =
    async (e) => {

      e.preventDefault();

      try {

        await addCar(formData);

        alert("Car Added");

        setFormData({
          brand: "",
          model: "",
          year: "",
          fuelType: "",
          transmission: "",
          seats: "",
          color: "",
          rentPerDay: "",
        });

        fetchCars();

      } catch (error) {

        console.error(error);

      }

    };

  const handleEdit = (car) => {

    setEditingId(car._id);

    setEditData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      fuelType: car.fuelType,
      transmission: car.transmission,
      color: car.color,
      seats: car.seats,
      rentPerDay: car.rentPerDay,
    });

  };

  const handleUpdate =
    async () => {

      try {

        await updateCar(
          editingId,
          editData
        );

        alert("Car Updated");

        setEditingId(null);

        fetchCars();

      } catch (error) {

        console.error(error);

      }

    };

  const handleAvailability =
    async (id) => {

      try {

        await toggleAvailability(id);

        fetchCars();

      } catch (error) {

        console.error(error);

      }

    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this car?"
        );

      if (!confirmDelete) return;

      try {

        await deleteCar(id);

        alert("Car Deleted");

        fetchCars();

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <AdminLayout>

      <h1 className="mb-4">
        Cars Management
      </h1>

      <div className="card shadow mb-4">

        <div className="card-header">
          <h4>
            Add New Car
          </h4>
        </div>

        <div className="card-body">

          <form
            onSubmit={handleAddCar}
          >

            <div className="row">

              <div className="col-md-6 mb-3">

                <input
                  type="text"
                  name="brand"
                  className="form-control"
                  placeholder="Brand"
                  value={formData.brand}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <input
                  type="text"
                  name="model"
                  className="form-control"
                  placeholder="Model"
                  value={formData.model}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <input
                  type="number"
                  name="year"
                  className="form-control"
                  placeholder="Year"
                  value={formData.year}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <input
                  type="text"
                  name="fuelType"
                  className="form-control"
                  placeholder="Fuel Type"
                  value={formData.fuelType}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <input
                  type="text"
                  name="transmission"
                  className="form-control"
                  placeholder="Transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <input
                  type="text"
                  name="color"
                  className="form-control"
                  placeholder="Color"
                  value={formData.color}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <input
                  type="number"
                  name="seats"
                  className="form-control"
                  placeholder="Seats"
                  value={formData.seats}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <input
                  type="number"
                  name="rentPerDay"
                  className="form-control"
                  placeholder="Rent Per Day"
                  value={formData.rentPerDay}
                  onChange={handleChange}
                />

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-success"
            >
              Add Car
            </button>

          </form>

        </div>

      </div>

      <div className="card shadow">

        <div className="card-header">

          <h4>
            Manage Cars
          </h4>

        </div>

        <div className="card-body">

          <table className="table table-hover">

            <thead>

              <tr>

                <th>Brand</th>
                <th>Model</th>
                <th>Fuel</th>
                <th>Seats</th>
                <th>Rent</th>
                <th>Status</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {cars.map((car) => (

                <tr
                  key={car._id}
                >

                  <td>
                    {car.brand}
                  </td>

                  <td>
                    {car.model}
                  </td>

                  <td>
                    {car.fuelType}
                  </td>

                  <td>
                    {car.seats}
                  </td>

                  <td>
                    ₹{car.rentPerDay}
                  </td>

                  <td>

                    <span
                      className={`badge ${
                        car.available
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {car.available
                        ? "Available"
                        : "Unavailable"}
                    </span>

                  </td>

                  <td>

                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() =>
                        handleEdit(car)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        handleAvailability(
                          car._id
                        )
                      }
                    >
                      Toggle
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(
                          car._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {editingId && (

        <div className="card shadow mt-4">

          <div className="card-header">

            <h4>
              Edit Car
            </h4>

          </div>

          <div className="card-body">

            <div className="row">

              {Object.keys(
                editData
              ).map((key) => (

                <div
                  className="col-md-6 mb-3"
                  key={key}
                >

                  <input
                    className="form-control"
                    value={
                      editData[key]
                    }
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        [key]:
                          e.target.value,
                      })
                    }
                  />

                </div>

              ))}

            </div>

            <button
              className="btn btn-success"
              onClick={
                handleUpdate
              }
            >
              Update Car
            </button>

          </div>

        </div>

      )}

    </AdminLayout>

  );

}

export default AdminCars;