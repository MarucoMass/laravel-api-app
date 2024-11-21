import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";


const AuthRoute = () => {
  const { token } = useContext(AuthContext);

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoute;
