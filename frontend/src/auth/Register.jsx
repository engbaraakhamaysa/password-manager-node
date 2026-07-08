import { useContext, useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import { authService } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Register() {
  // ==========================================================
  // Component State
  // ==========================================================
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [accept, setAccept] = useState(false);

  // ==========================================================
  // References
  // ==========================================================
  const nameRef = useRef();

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
  // Focus the name input when component mounts
  // ==========================================================
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // ==========================================================
  // Handle Input Change
  // Update form state
  // ==========================================================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================================
  // Handle Form Submission
  // ==========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setAccept(true);
    setErrorMsg("");

    // ==========================================================
    // Client-side Validation
    // ==========================================================
    const isValid =
      form.name.trim() !== "" &&
      form.email.trim() !== "" &&
      form.password.length >= 8 &&
      form.password === form.confirmPassword;

    if (!isValid) return;

    try {
      const user = await authService.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // Save user in Context
      setUser(user);

      // Redirect based on user role
      navigate(user.role === "admin" ? "/admin" : "/user");
    } catch (err) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 409) {
        setErrorMsg(message);
      } else if (status === 400) {
        setErrorMsg(message);
      } else if (!status) {
        setErrorMsg("Network error. Please try again.");
      } else {
        setErrorMsg(message || "Something went wrong.");
      }
    }
  };

  // ==========================================================
  // JSX
  // ==========================================================
  return (
    <div>
      <Header />

      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="auth-header">Register</h2>

          {/* Name */}
          <input
            ref={nameRef}
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="auth-input"
          />

          {accept && form.name.trim() === "" && (
            <p className="auth-error">Name is required.</p>
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="auth-input"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="auth-input"
          />

          {accept && form.password.length < 8 && (
            <p className="auth-error">
              Password must be at least 8 characters.
            </p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="auth-input"
          />

          {accept && form.password !== form.confirmPassword && (
            <p className="auth-error">Passwords do not match.</p>
          )}

          {/* Server Error */}
          {errorMsg && <div className="auth-error-box">{errorMsg}</div>}

          <div className="auth-submit">
            <button type="submit" className="auth-button">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

//  <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               name: e.target.value,
//             })
//           }
//           className="auth-input"
//         />
