import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
console.log("Dashboarddd rendered");
  // No token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Token exists → allow access
  return children;
}

export default ProtectedRoute;