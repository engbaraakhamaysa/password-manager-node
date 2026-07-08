import { Routes, Route } from "react-router-dom";
import SignUp from "./auth/Register";
import Login from "./auth/Login";
import PasswordPage from "./Pages/Users/PasswordPage";
import About from "./Pages/Users/About";
import Home from "./Pages/Users/Home";
import AdminDashboard from "./Pages/Admin/Admin";
import ProtectedRoute from "./Components/ProtectedRoute";
import User from "./Pages/User";

export default function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/user" element={<User />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/password" element={<PasswordPage />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/About" element={<About />}></Route>
      </Routes>
    </div>
  );
}
