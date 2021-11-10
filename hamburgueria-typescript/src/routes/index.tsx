import { Route, Switch } from "react-router-dom";
import { RegisterFild } from "../page/Register";
import { LoginField } from "../page/Login";
import Main from "../page/Main";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route exact path="/login">
        <LoginField />
      </Route>
      <Route exact path="/register">
        <RegisterFild />
      </Route>
    </Switch>
  );
};
