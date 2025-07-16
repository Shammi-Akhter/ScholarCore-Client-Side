import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div>Loading...</div>;

  if (user && ["user", "admin", "moderator"].includes(role)) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;