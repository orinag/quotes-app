import "./Auth.css";
import Input from "../../../shared/components/FormElements/Input";
import useForm from "../../../shared/hooks/form-hook";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../../../shared/hooks-store/store";
import { Fragment, useState } from "react";
import useHttp from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner";
import Backdrop from "../../../shared/components/UI/Backdrop";
import Modal from "../../../shared/components/UI/Modal";

const Auth = (props) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authReq, isLoading, err, clearErr] = useHttp();
  const [state, dispatch] = useStore();
  const history = useHistory();

  const [signUpFormState, setSignUpInput] = useForm(
    {
      username: { value: "", IsValid: false },
      email: { value: "", IsValid: false },
      password: { value: "", IsValid: false },
    },

    false
  );
  const [loginFormState, setLoginInput] = useForm(
    {
      email: { value: "", IsValid: false },
      password: { value: "", IsValid: false },
    },

    false
  );

  const switchHandle = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };
  const loginSubmitHandler = (event) => {
    event.preventDefault();
    const userInputs = {
      email: loginFormState.inputs.email.value,
      password: loginFormState.inputs.password.value,
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
  const SignUpSubmitHandle = (event) => {
    event.preventDefault();
    const newUser = {
      email: signUpFormState.inputs.email.value,
      username: signUpFormState.inputs.username.value,
      password: signUpFormState.inputs.password.value,
    };
    console.log(newUser);
    authReq("SIGNUP", {
      url: "http://localhost:5000/api/users/sign-up",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
  };

  return (
    <Fragment>
      {err && !isLoading && (
        <Modal
          onClick={clearErr}
          header="Error"
          content={err.message}
          button="Close"
        />
      )}
      {isLoading && (
        <Backdrop className="centered">
          <LoadingSpinner />
        </Backdrop>
      )}
      <form
        className="form"
        onSubmit={isLoginMode ? loginSubmitHandler : SignUpSubmitHandle}
      >
        <div className="auth-title">
          <h1>{isLoginMode ? "Login" : "Sign Up"}</h1>
        </div>
        <div className="email_input">
          <Input
            id="email"
            element={"input"}
            type="text"
            onInput={isLoginMode ? setLoginInput : setSignUpInput}
          >
            Email:
          </Input>
        </div>
        {!isLoginMode && (
          <div className="username_input">
            <Input
              id="username"
              element={"input"}
              type="text"
              onInput={setSignUpInput}
            >
              Username:
            </Input>
          </div>
        )}
        <div className="password_input">
          <Input
            id="password"
            element={"input"}
            type="text"
            onInput={isLoginMode ? setLoginInput : setSignUpInput}
          >
            Password:
          </Input>
        </div>

        <div className="form_actions">
          <button type="submit">Submit</button>
        </div>
        <div className="sign-in-link">
          <p>
            {isLoginMode ? "haven't account yet?" : "already have an account?"}
          </p>
          <button
            type="button"
            className="sign-in_button"
            onClick={switchHandle}
          >
            {isLoginMode ? "Create one now!" : "Enter now!"}
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Auth;
