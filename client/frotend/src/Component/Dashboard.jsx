

// export default Dashboard;
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  console.log("Dashboard rendered");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Welcome! Your app is working</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;