# 🚗 Car Rental System (MERN Stack)

A full-stack Car Rental Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The application allows users to browse cars, book vehicles, manage bookings, and enables administrators to manage users, cars, and bookings through a dedicated admin dashboard.

---

## ✨ Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Admin Role-Based Access

### User Features

* Browse Available Cars
* Book Cars
* View Personal Bookings
* Cancel Bookings
* Responsive Navigation Bar

### Admin Features

* Dashboard Statistics
* User Management

  * View Users
  * Search Users
  * Change User Roles
  * Delete Users
* Car Management

  * Add Cars
  * Edit Cars
  * Delete Cars
  * Manage Availability
* Booking Management

  * View All Bookings
  * Confirm Bookings
  * Cancel Bookings

### Dashboard Analytics

* Total Users
* Total Cars
* Total Bookings
* Pending Bookings
* Confirmed Bookings
* Cancelled Bookings
* Revenue Tracking

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap 5

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MongoDB
* Mongoose

---

## 📁 Project Structure

frontend/
├── src/
│ ├── pages/
│ ├── components/
│ ├── api/
│ └── App.jsx

backend/
├── controllers/
├── routes/
├── middleware/
├── models/
├── config/
├── server.js
└── .env

---

## ⚙️ Installation

### Clone Repository

git clone <repository-url>

### Backend Setup

cd backend

npm install

Create .env file:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

Run Backend:

npm run dev

### Frontend Setup

cd frontend

npm install

npm run dev

---

## 🔑 Admin Access

Create an admin account and update the user's role to "admin" in MongoDB, or use a seed script if available.

---

## 🚀 Future Improvements

* Car Image Upload
* Payment Gateway Integration
* Booking Calendar
* Advanced Search & Filters
* Email Notifications
* User Profile Management
* Rental Reports
* Dark Mode Theme

---

## 👨‍💻 Author

Developed as a MERN Stack Full-Stack Project for learning and portfolio purposes.
