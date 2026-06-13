import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../components/AdminLayout";

import {
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../api/adminApi";

function AdminUsers() {

  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const fetchUsers =
    async () => {

      try {

        const data =
          await getAllUsers();

        setUsers(data);

      } catch (error) {

        console.error(error);

      }

    };

  useEffect(() => {

    fetchUsers();

  }, []);

  const filteredUsers =
    users.filter((user) =>
      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      user.email
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this user?"
        );

      if (!confirmDelete) return;

      try {

        await deleteUser(id);

        alert(
          "User Deleted Successfully"
        );

        fetchUsers();

      } catch (error) {

        console.error(error);

      }

    };

  const handleRoleChange =
    async (
      id,
      role
    ) => {

      try {

        await updateUserRole(
          id,
          role
        );

        alert(
          "Role Updated Successfully"
        );

        fetchUsers();

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <AdminLayout>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1>
          Users Management
        </h1>

        <span className="badge bg-primary fs-6">
          Total Users: {users.length}
        </span>

      </div>

      <div className="mb-3">

        <input
          type="text"
          className="form-control"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <div className="card shadow-sm">

        <div className="card-body">

          <table className="table table-hover align-middle">

            <thead>

              <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Role</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.length > 0 ? (

                filteredUsers.map(
                  (user) => (

                    <tr
                      key={user._id}
                    >

                      <td>
                        {user.name}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>

                        <select
                          className="form-select"
                          value={user.role}
                          onChange={(e) => {

                            const confirmRole =
                              window.confirm(
                                `Change role to ${e.target.value}?`
                              );

                            if (
                              !confirmRole
                            )
                              return;

                            handleRoleChange(
                              user._id,
                              e.target.value
                            );

                          }}
                        >

                          <option value="user">
                            User
                          </option>

                          <option value="admin">
                            Admin
                          </option>

                        </select>

                      </td>

                      <td>

                        {user.role !==
                          "admin" && (

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(
                                user._id
                              )
                            }
                          >
                            Delete
                          </button>

                        )}

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center"
                  >
                    No users found
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

export default AdminUsers;