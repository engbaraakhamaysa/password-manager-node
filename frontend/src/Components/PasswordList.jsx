export default function PasswordList({ passwords }) {
  if (passwords.length === 0) {
    return <p>No passwords found.</p>;
  }

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

          <button>Edit</button>
          <button style={{ marginLeft: "10px" }}>Delete</button>
        </div>
      ))}
    </div>
  );
}
