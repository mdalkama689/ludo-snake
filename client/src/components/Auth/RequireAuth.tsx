import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
const RequireAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) return;
  const { isAuthenticated, loading } = auth;

  if (loading) {
    return <div>loading........</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  return <Outlet />;
};

export default RequireAuth;
