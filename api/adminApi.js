import api from "./axios";

export const getDashboardStats = async () => {
  const response = await api.get(
    "/admin/dashboard"
  );

  return response.data;
};

export const getAllBookings = async () => {
  const response = await api.get(
    "/admin/bookings"
  );

  return response.data;
};

export const confirmBooking = async (id) => {
  const response = await api.patch(
    `/admin/bookings/${id}/confirm`
  );

  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await api.patch(
    `/admin/bookings/${id}/cancel`
  );

  return response.data;
};

export const getAllCars = async () => {
  const response = await api.get(
    "/cars"
  );

  return response.data;
};

export const deleteCar = async (id) => {
  const response = await api.delete(
    `/cars/${id}`
  );

  return response.data;
};

export const addCar = async (carData) => {
  const response = await api.post(
    "/cars",
    carData
  );

  return response.data;
};


export const updateCar = async (
  id,
  carData
) => {
  const response = await api.put(
    `/cars/${id}`,
    carData
  );

  return response.data;
};


export const getAllUsers = async () => {

  const response =
    await api.get("/admin/users");

  return response.data;

};


export const deleteUser = async (
  id
) => {

  const response =
    await api.delete(
      `/admin/users/${id}`
    );

  return response.data;

};

export const updateUserRole =
async (
  id,
  role
) => {

  const response =
    await api.patch(
      `/admin/users/${id}/role`,
      { role }
    );

  return response.data;

};


export const toggleAvailability =
async (id) => {

  const response =
    await api.patch(
      `/cars/${id}/availability`
    );

  return response.data;

};

