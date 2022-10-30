import { Fragment } from "react";

import "../Auth.css";
import Input from "../../../../shared/components/FormElements/Input";
import useForm from "../../../../shared/hooks/form-hook";
import useHttp from "../../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../../shared/components/UI/LoadingSpinner";
import Modal from "../../../../shared/components/UI/Modal";
import LoginForm from "./LoginForm";

const Login = (props) => {
  const [loginFormState, setLoginInput] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },

    false
  );

  const checkValidation = (value, validationType) => {
    switch (validationType) {
      case "EMAIL":
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);

      case "PASS":
        return value.trim().length > 7;
    }
  };

  const emailInputHandler = (event) => {
    console.log(checkValidation(event.target.value, "EMAIL"));
    setLoginInput(
      "email",
      event.target.value,
      checkValidation(event.target.value, "EMAIL")
    );
  };
  const passwordInputHandler = (event) => {
    console.log(checkValidation(event.target.value, "PASS"));
    setLoginInput(
      "password",
      event.target.value,
      checkValidation(event.target.value, "PASS")
    );
  };

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

/*<form className="form" onSubmit={loginSubmitHandler}>

        <div className="email_input">
          <Input
            id="login_email"
            element={"input"}
            type="text"
            onChange={emailInputHandler}
            value={loginFormState.inputs.email?.value}
            isValid={loginFormState.inputs.email.isValid}
          >
            Email:
          </Input>
        </div>

        <div className="password_input">
          <Input
            id="login_password"
            element={"input"}
            type="text"
            onChange={passwordInputHandler}
            value={loginFormState.inputs.password?.value}
            isValid={loginFormState.inputs.password.isValid}
          >
            Password:
          </Input>
        </div>

        <div className="form_actions">
          <button
            id="login-button"
            type="submit"
            disabled={!loginFormState.isValid}
          >
            Submit
          </button>
        </div>

      </form> */
