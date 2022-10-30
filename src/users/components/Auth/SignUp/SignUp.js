import { Fragment } from "react";

import "../Auth.css";
import SignUpForm from "./SignUpForm";

const SignUp = (props) => {
  return (
    <Fragment>
      <div className="auth-title">
        <h1>Sign Up</h1>
      </div>
      <SignUpForm switchHandle={props.switchHandle} />
    </Fragment>
  );
};

export default SignUp;
