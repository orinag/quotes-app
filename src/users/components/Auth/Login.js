import { Fragment } from "react";
import { useHistory } from "react-router-dom";

import "./Auth.css";
import Input from "../../../shared/components/FormElements/Input";
import { useStore } from "../../../shared/hooks-store/store";
import useForm from "../../../shared/hooks/form-hook";
import useHttp from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner";
import Backdrop from "../../../shared/components/UI/Backdrop";
import Modal from "../../../shared/components/UI/Modal";

const Login = (props) => {
  const [authReq, isLoading, err, clearErr] = useHttp();

  const [loginFormState, setLoginInput] = useForm(
    {
      email: { value: "", IsValid: false },
      password: { value: "", IsValid: false },
    },

    false
  );

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    console.log(loginFormState);
    const userInputs = {
      email: loginFormState.inputs.login_email.value,
      password: loginFormState.inputs.login_password.value,
    };

    authReq("LOGIN", {
      url: "http://localhost:5000/api/users/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInputs),
    });
  };

  return (
    <Fragment>
      <Modal
        onClick={() => {
          clearErr();
        }}
        onClose={() => {
          clearErr();
        }}
        header="Error"
        content={err?.message}
        button="Close"
        show={err}
      />
      {isLoading && (
        <Backdrop className="centered">
          <LoadingSpinner />
        </Backdrop>
      )}

      <form className="form" onSubmit={loginSubmitHandler}>
        <div className="auth-title">
          <h1>{"Login"}</h1>
        </div>
        <div className="email_input">
          <Input
            id="login_email"
            element={"input"}
            type="text"
            onInput={setLoginInput}
          >
            Email:
          </Input>
        </div>

        <div className="password_input">
          <Input
            id="login_password"
            element={"input"}
            type="text"
            onInput={setLoginInput}
          >
            Password:
          </Input>
        </div>

        <div className="form_actions">
          <button id="login-button" type="submit">
            Submit
          </button>
        </div>
        <div className="sign-in-link">
          <p>haven't account yet?</p>
          <button
            id="flip-mode-button"
            type="button"
            className="btn btn_flip"
            onClick={props.switchHandle}
          >
            Create one now!
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
