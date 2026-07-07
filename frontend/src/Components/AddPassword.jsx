export default function AddPassword(onClose) {
  return (
    <div>
      <h2>Add Password</h2>

      <input type="text" placeholder="Website" />
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Pasword" />
      <textarea placeholder="Notes"></textarea>

      <button onClick={onClose}>Cancel</button>
      <button>Save</button>
    </div>
  );
}
