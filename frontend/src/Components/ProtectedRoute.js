import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function ProtectedRoute({ children }) {
  // const token = localStorage.getItem("token");
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  try {
    // const decoded = jwtDecode(token);

    if (user.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    //     if (role && user.role !== role) {
    //   return <Navigate to="/" />;
    // }

    return children;
  } catch (err) {
    return <Navigate to="/" replace />;
  }
}
