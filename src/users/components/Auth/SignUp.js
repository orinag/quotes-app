import { Fragment } from "react";

import "./Auth.css";
import Input from "../../../shared/components/FormElements/Input";
import useForm from "../../../shared/hooks/form-hook";
import useHttp from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner";
import Backdrop from "../../../shared/components/UI/Backdrop";
import Modal from "../../../shared/components/UI/Modal";

const SignUp = (props) => {
  const [authReq, isLoading, err, clearErr] = useHttp();

  const [signUpFormState, setSignUpInput] = useForm(
    {
      username: { value: "", IsValid: false },
      email: { value: "", IsValid: false },
      password: { value: "", IsValid: false },
    },

    false
  );

  const SignUpSubmitHandle = (event) => {
    event.preventDefault();
    const newUser = {
      email: signUpFormState.inputs.email.value,
      username: signUpFormState.inputs.username.value,
      password: signUpFormState.inputs.password.value,
    };

    authReq("SIGNUP", {
      url: "http://localhost:5000/api/users/sign-up",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
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
      {isLoading && <LoadingSpinner />}

      <form className="form" onSubmit={SignUpSubmitHandle}>
        <div className="auth-title">
          <h1>Sign Up</h1>
        </div>
        <div className="email_input">
          <Input
            id="email"
            element={"input"}
            type="text"
            onInput={setSignUpInput}
          >
            Email:
          </Input>
        </div>
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
        <div className="password_input">
          <Input
            id="password"
            element={"input"}
            type="text"
            onInput={setSignUpInput}
          >
            Password:
          </Input>
        </div>

        <div className="form_actions">
          <button id="sign-up-button" type="submit">
            Submit
          </button>
        </div>
        <div className="sign-in-link">
          <p>already have an account?</p>
          <button
            type="button"
            className="btn btn_flip"
            onClick={props.switchHandle}
          >
            Enter now!
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default SignUp;
