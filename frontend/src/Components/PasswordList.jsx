import { passwordService } from "../services/passwordServices";

export default function PasswordList({ passwords, refreshPasswords }) {
  if (passwords.length === 0) {
    return <p>No passwords found.</p>;
  }

  const handleDelete = async (id) => {
    try {
      await passwordService.delete(id);

      await refreshPasswords();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (password) => {
    try {
      await passwordService.update(password._id, {
        website: "new website",
        username: password.username,
        password: password.password,
        notes: password.notes,
      });

      await refreshPasswords();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {passwords.map((password) => (
        <div
          key={password._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginTop: "15px",
          }}
        >
          <h3>{password.website}</h3>

          <p>
            <strong>Username:</strong> {password.username}
          </p>

          <p>
            <strong>Password:</strong> ********
          </p>

          <button onClick={() => handleUpdate(password)}>Edit</button>
          <button onClick={() => handleDelete(password._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
