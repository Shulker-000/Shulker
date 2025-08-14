import React from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  // Retrieve user object from Redux store
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      Dashboard
      {user?.username && <p>Welcome, {user.username}!</p>}
    </div>
  );
}

export default Dashboard;
