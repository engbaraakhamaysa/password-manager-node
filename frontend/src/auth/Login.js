import { useState } from "react";
import Header from "../Components/Header";
import { authService } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  // ==========================================================
  // React Hooks (useState)
  // Store and update component state
  // ==========================================================

  // Store user email
  const [email, setEmail] = useState("");

  // Store user password
  const [password, setPassword] = useState("");

  // Store server error status (401, 400, ...)
  const [emailError, setEmailError] = useState(null);

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

  async function Submit(e) {
    // Prevent page refresh after submitting the form
    e.preventDefault();

    // Enable validation messages
    setAccept(true);

    // Clear previous server error
    setEmailError(null);

    // Stop execution if password is too short
    if (password.length < 8) return;

    // ==========================================================
    // API Call (Async / Await)
    // Send login request to the backend
    // ==========================================================

    try {
      const res = await authService.login({
        email,
        password,
      });

      console.log(res);

      // ==========================================================
      // Browser Local Storage
      // Save JWT token after successful login
      // ==========================================================

      window.localStorage.setItem("token", res.data);

      // ==========================================================
      // React Router Navigation
      // Redirect user without reloading the application
      // ==========================================================
      const token = localStorage.getItem("token");

      const decoded = jwtDecode(token);

      console.log(decoded);

      if (decoded.role === "admin") {
        navigate("/admin");
      } else if (decoded.role === "user") {
        navigate("/user");
      } else {
        navigate("/");
      }
      // If login fails, an error code (401, 400, ...) is returned
    } catch (err) {
      // ==========================================================
      // Error Handling
      // Save server status code to display an error message
      // ==========================================================

      setEmailError(err.res.status);
    }
  }

  // ==========================================================
  // JSX
  // UI returned by the component
  // ==========================================================

  return (
    <div>
      <Header />

      <div className="auth-container">
        {/* Form submission is handled by React */}
        <form onSubmit={Submit} className="auth-form">
          <h2 className="auth-header">Login</h2>

          {/* Controlled Input (Email) */}
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />

          {/* Conditional Rendering */}
          {accept && (emailError === 401 || emailError === 400) && (
            <p className="auth-error">Incorrect email or password</p>
          )}

          {/* Controlled Input (Password) */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />

          {/* Conditional Rendering */}
          {password.length < 8 && accept && (
            <p className="auth-error">
              Password must be more than 8 characters
            </p>
          )}

          <div className="auth-submit">
            <button type="submit" className="auth-button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
