import { useState } from "react";
import Header from "../Components/Header";
import { authService } from "../services/authServices";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  // ==========================================================
  // React Hooks (useState)
  // Store and update component state
  // ==========================================================

  // Store all form fields inside one object
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordR: "",
  });

  // Store error messages returned from the server
  const [errorMsg, setErrorMsg] = useState("");

  // Track whether the user has submitted the form
  // Used to display validation messages only after submit
  const [accept, setAccept] = useState(false);

  // ==========================================================
  // React Router (useNavigate)
  // Used for navigation without reloading the page
  // ==========================================================

  const navigate = useNavigate();

  // ==========================================================
  // Event Handler
  // Handles form submission
  // ==========================================================

  const handleSubmit = async (e) => {
    // Prevent page refresh
    e.preventDefault();

    // Enable validation messages
    setAccept(true);

    // Clear previous server error
    setErrorMsg("");

    // ==========================================================
    // Client-side Validation
    // Verify input before sending request
    // ==========================================================

    const isValid =
      form.name.trim() !== "" &&
      form.password.length >= 8 &&
      form.password === form.passwordR;

    // Stop execution if validation fails
    if (!isValid) return;

    // ==========================================================
    // API Call (Async / Await)
    // Send registration data to the backend
    // ==========================================================

    try {
      const res = await authService.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // Registration successful
      console.log(res);
      navigate("/");

      // alert("Registration successful!");
      // localStorage.setItem("token", res.data.token);
      // window.location.pathname = "/";
    } catch (err) {
      // ==========================================================
      // Error Handling
      // Display different messages based on server response
      // ==========================================================

      if (err.response?.status === 422) {
        setErrorMsg("Email is already in use.");
      } else if (err.response?.status === 400) {
        setErrorMsg("Passwords do not match.");
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
    }
  };

  // ==========================================================
  // JSX
  // UI returned by the component
  // ==========================================================

  return (
    <div>
      <Header />

      <div className="auth-container">
        {/* Form submission is handled by React */}
        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="auth-header">Register</h2>

          {/* Controlled Input (Name) */}
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="auth-input"
          />

          {/* Conditional Rendering */}
          {accept && form.name.trim() === "" && (
            <p className="auth-error">Name is required</p>
          )}

          {/* Controlled Input (Email) */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="auth-input"
            required
          />

          {/* Controlled Input (Password) */}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="auth-input"
          />

          {/* Conditional Rendering */}
          {accept && form.password.length < 8 && (
            <p className="auth-error">Password must be at least 8 characters</p>
          )}

          {/* Controlled Input (Confirm Password) */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={form.passwordR}
            onChange={(e) =>
              setForm({
                ...form,
                passwordR: e.target.value,
              })
            }
            className="auth-input"
          />

          {/* Conditional Rendering */}
          {accept && form.password !== form.passwordR && (
            <p className="auth-error">Passwords do not match</p>
          )}

          {/* Display server error message */}
          {errorMsg && <p className="auth-error">{errorMsg}</p>}

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
