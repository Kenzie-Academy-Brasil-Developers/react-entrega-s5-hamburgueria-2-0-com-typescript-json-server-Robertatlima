import { Redirect } from "react-router-dom";
import { Login } from "../../components/Login";
import { useAuth } from "../../Provider/Auth";

export const LoginField = () => {
  const { authToken } = useAuth();

  if (authToken) {
    return <Redirect to="/" />;
  }
  return <Login />;
};
