import React, { Fragment, useCallback } from "react";

import "../Forms.css";
import Modal from "../../../../shared/components/UI/Modal";
import LoadingSpinner from "../../../../shared/components/UI/LoadingSpinner";
import useHttp from "../../../../shared/hooks/http-hook";
import { Formik, Form, Field, ErrorMessage } from "formik";

const LoginForm = (props) => {
  const [authReq, isLoading, err, clearErr] = useHttp();

  const loginSubmitHandler = useCallback(
    (values) => {
      const userInputs = {
        email: values.login_email,
        password: values.login_password,
      };

      authReq("LOGIN", {
        url: process.env.REACT_APP_BACKEND_URL + "/users/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInputs),
      });
    },
    [authReq]
  );
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
        show={err?.message}
      />
      {isLoading && <LoadingSpinner />}
      <Formik
        initialValues={{ login_email: "", login_password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.login_email) {
            errors.login_email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.login_email)
          ) {
            errors.login_email = "Invalid email address";
          }

          if (!values.login_password) {
            errors.login_password = "Password is required";
          } else if (values.login_password.trim().length < 8) {
            errors.login_password = "Invalid password";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            loginSubmitHandler(values);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form form-control">
            <div className="errs_container">
              <ErrorMessage
                className="invalid"
                name="login_email"
                component="div"
              />
              <ErrorMessage
                className="invalid"
                name="login_password"
                component="div"
              />
            </div>

            <label id="login_email" type="login_email">
              Email:
            </label>
            <Field id="login_email" type="login_email" name="login_email" />
            <label id="login_password" type="login_password">
              Password:
            </label>
            <Field type="login_password" name="login_password" />
            <button
              id="login-submit"
              className="btn"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <div className="sign-in-link">
        <p>haven't account yet?</p>
        <button
          id="flip-mode-button"
          type="button"
          className="btn_flat"
          onClick={props.switchHandle}
        >
          Create one now!
        </button>
      </div>
    </Fragment>
  );
};
export default LoginForm;
