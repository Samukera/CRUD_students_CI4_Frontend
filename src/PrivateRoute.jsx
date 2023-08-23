import { useContext, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const { loading } = authState;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !authState.user) {
      navigate("/");
    }
  }, [loading, authState.user, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return children;
};

export default PrivateRoute;
