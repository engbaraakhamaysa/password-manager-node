// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { UserContext } from "../Context/UserContext";

// export default function Header() {
//   const email = localStorage.getItem("email");
//   const { user } = useContext(UserContext);
//   // logout function
//   function handleLogOut() {
//     window.localStorage.removeItem("email");
//     window.localStorage.removeItem("userId");
//     window.localStorage.removeItem("isAdmin");
//     window.location.pathname = "/";
//     // }
//     //Check user status
//     // const isLoggedIn = window.localStorage.getItem("email");
//     const isLoggedIn = user.name;
//     const isAdmin = user.role === "admin";

//     return (
//       <header className="main-header">
//         <div className="header-left">
//           <Link to="/" className="header-link">
//             Home
//           </Link>
//           <Link to="/Password" className="header-link">
//             Password Management
//           </Link>
//           <Link to="/about" className="header-link">
//             About
//           </Link>
//           {isAdmin && (
//             <Link to="/Admin" className="header-link">
//               Dashboard
//             </Link>
//           )}
//         </div>

//         <div className="header-right">
//           {/* The !isLoggedIn condition checks if the user is not logged in to show them the Register and login  or LogOut links.*/}
//           {!isLoggedIn ? (
//             <>
//               <Link to="/register" className="header-link">
//                 Register
//               </Link>
//               <Link to="/login" className="header-link">
//                 Login
//               </Link>
//             </>
//           ) : (
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 gap: "10px",
//               }}
//             >
//               <p> Welcam {user ? user.name : "Guest"}</p>
//               <button onClick={handleLogOut} className="logout-btn">
//                 Log Out
//               </button>
//             </div>
//           )}
//         </div>
//       </header>
//     );
//   }
// }

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-right"></div>
    </header>
  );
}
