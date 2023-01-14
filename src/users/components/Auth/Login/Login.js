import { Fragment } from "react";

import "../Auth.css";
import LoginForm from "./LoginForm";

const Login = (props) => {
  return (
    <Fragment>
      <div className="auth-title">
        <h1>{"Login"}</h1>
      </div>
      <LoginForm switchHandle={props.switchHandle} />
    </Fragment>
  );
};

export default Login;
