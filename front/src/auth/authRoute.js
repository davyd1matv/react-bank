import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const AuthRoute = ({ children }) => {
  const { state } = useAuth();

  return state.token && state.user.isConfirm ? (
    <Navigate to={`/balance/${state.user.id}`} />
  ) : (
    children
  );
};

export default AuthRoute;
