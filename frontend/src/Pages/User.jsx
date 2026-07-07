import { useEffect, useState } from "react";
import AddPassword from "../Components/AddPassword";
import Header from "../Components/Header";
import PasswordList from "../Components/PasswordList";
import { passwordService } from "../Services/passwordServices";

export default function User() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const res = await passwordService.getPasswords();
        setPasswords(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPasswords();
  }, []);

  return (
    <div>
      <Header />

      <h1>My Passwords</h1>

      <button
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
        onClick={() => setShowAddModal(true)}
      >
        Add Password
      </button>

      <PasswordList passwords={passwords} />

      {showAddModal && <AddPassword onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
