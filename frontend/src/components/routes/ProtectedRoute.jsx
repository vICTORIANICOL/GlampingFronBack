import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <h5 className="unauthorized">Du har ikke adgang til denne side...</h5>
    );
  }
  return children;
};

export default ProtectedRoute;
