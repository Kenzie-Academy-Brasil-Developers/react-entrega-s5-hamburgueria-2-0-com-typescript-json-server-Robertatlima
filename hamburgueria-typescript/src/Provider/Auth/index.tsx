import { createContext, ReactNode, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthProviderData {
  signIn: (userData: userData) => void;
  signUp: (userData: userData) => void;
  Logout: () => void;
  authToken: string;
  userid: string;
}
interface userData {
  email: string;
  password: string;
  name?: string;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory();

  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const [userid, setUserid] = useState(
    () => localStorage.getItem("userId") || ""
  );

  const signIn = (userData: userData) => {
    axios
      .post("https://jsonkenzie-burg.herokuapp.com/login", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("userId", response.data.user.id);

        setAuthToken(response.data.accessToken);
        setUserid(response.data.user.id);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const signUp = (userData: userData) => {
    axios
      .post("https://jsonkenzie-burg.herokuapp.com/register", userData)
      .then((response) => {
        history.push("/login");
      })
      .catch((err) => console.log(err));
  };

  const Logout = () => {
    localStorage.clear();

    setAuthToken("");
    setUserid("");

    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ signUp, userid, authToken, Logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
