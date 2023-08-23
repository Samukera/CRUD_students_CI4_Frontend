import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    loading: true,
    token: "",
    user: null,
  });

  const setUserAuthInfo = ({ token, data }) => {
    setAuthState({
      loading: false,
      token: token,
      user: jwt_decode(token),
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      loading: false,
      token: "",
      user: null,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthState({
        loading: false,
        token: token,
        user: jwt_decode(token),
      });
    } else {
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("token", authState.token);
  }, [authState]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
