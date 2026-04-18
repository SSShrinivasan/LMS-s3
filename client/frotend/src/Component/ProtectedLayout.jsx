import { Navigate, Outlet } from "react-router-dom";

function ProtectedLayout() {
  const token = localStorage.getItem("token");
  console.log("Dashboard rende3red");

  if (!token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout;