import { useState } from "react";
import { passwordService } from "../services/passwordServices";

export default function AddPassword({ onClose, refreshPasswords }) {
  const [form, setForm] = useState({
    website: "",
    username: "",
    password: "",
    notes: "",
  });

  console.log(form);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await passwordService.create(form);

      await refreshPasswords();

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Add Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Website"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pasword"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br />
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <br />
        <button onClick={onClose}>Cancel</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
