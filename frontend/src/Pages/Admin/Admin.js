import Header from "../../Components/Header";
import { useEffect, useMemo, useState } from "react";
import { adminServices } from "../../services/adminServices";

export default function AdminDashboard() {
  //this to save data in formted to users
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  //get users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminServices.getUsers();

        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  // const filteredUsers = useMemo(() => {
  //   return users.filter((user) =>
  //     user.name.toLowerCase().includes(search.toLowerCase()),
  //   );
  // }, [users, search]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <Header />

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.map((user) => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      ))}
      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          fontFamily: "sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                Name
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                  >
                    {user.name}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                  >
                    {user.email}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
