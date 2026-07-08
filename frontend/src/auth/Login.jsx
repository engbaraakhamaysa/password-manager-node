import { useContext, useRef, useState, useEffect } from "react";
import Header from "../Components/Header";
import { authService } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Login() {
  // ==========================================================
  // State
  // ==========================================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [accept, setAccept] = useState(false);

  // ==========================================================
  // Refs
  // ==========================================================
  const emailRef = useRef(null);

  // ==========================================================
  // Context
  // ==========================================================
  const { setUser } = useContext(UserContext);

  // ==========================================================
  // Navigation
  // ==========================================================
  const navigate = useNavigate();

  // ==========================================================
  // Effects
  // Focus email input on mount
  // ==========================================================
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // ==========================================================
  // Handle Login
  // ==========================================================
  async function handleSubmit(e) {
    e.preventDefault();

    setAccept(true);
    setError("");

    // ==========================================================
    // Client-side validation
    // ==========================================================
    const isValid = email.trim() !== "" && password.length >= 8;

    if (!isValid) return;

    try {
      // Login request
      const user = await authService.login({
        email,
        password,
      });

      // Save user in Context
      setUser(user);

      // Redirect based on role
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      // ==========================================================
      // Error Handling
      // ==========================================================
      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 404) {
        // setError("User not found. Please check your email.");
        setError(message);
      } else if (status === 401) {
        // setError("Incorrect email or password.");
        setError(message);
      } else if (!status) {
        setError("Network error. Please try again.");
      } else {
        setError(message || "Something went wrong.");
      }
    }
  }

  // ==========================================================
  // UI
  // ==========================================================
  return (
    <div>
      <Header />

      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="auth-header">Login</h2>

          {/* Email */}
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />

          {accept && email.trim() === "" && (
            <p className="auth-error">Email is required</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />

          {accept && password.length < 8 && (
            <p className="auth-error">Password must be at least 8 characters</p>
          )}

          {/* Submit */}
          <div className="auth-submit">
            <button type="submit" className="auth-button">
              Login
            </button>
          </div>

          {/* Server Error */}
          {error && <div className="auth-error-box">{error}</div>}
        </form>
      </div>
    </div>
  );
}
