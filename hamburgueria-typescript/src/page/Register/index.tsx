import { Redirect } from "react-router-dom";
import { useAuth } from "../../Provider/Auth";
import { Register } from "../../components/Register";

export const RegisterFild = () => {
  const { authToken } = useAuth();

  if (authToken) {
    return <Redirect to="/" />;
  }
  return <Register />;
};
