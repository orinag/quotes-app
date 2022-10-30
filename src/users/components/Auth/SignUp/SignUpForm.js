import React, { Fragment } from "react";

import "../Forms.css";
import Modal from "../../../../shared/components/UI/Modal";
import useHttp from "../../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../../shared/components/UI/LoadingSpinner";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SignUpForm = (props) => {
  const [authReq, isLoading, err, clearErr] = useHttp();

  const SignUpSubmitHandle = (values) => {
    const newUser = {
      email: values.email,
      username: values.username,
      password: values.password,
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
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.trim().length < 8) {
            errors.password = "Invalid password";
          }

          if (!values.username) {
            errors.username = "Username is required";
          } else if (values.username.trim().length < 3) {
            errors.username = "Invalid username";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            SignUpSubmitHandle(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form form-control">
            <div className="errs_container">
              <ErrorMessage className="invalid" name="email" component="div" />
              <ErrorMessage
                className="invalid"
                name="username"
                component="div"
              />
              <ErrorMessage
                className="invalid"
                name="password"
                component="div"
              />
            </div>

            <label
              id="email"
              type="email"
              className={`${isSubmitting && "invalid"}`}
            >
              Email:
            </label>
            <Field
              id="email"
              type="email"
              name="email"
              className={`${isSubmitting && "invalid"}`}
            />

            <label id="username" type="username">
              Username:
            </label>
            <Field type="username" name="username" />

            <label id="password" type="password">
              Password:
            </label>
            <Field type="password" name="password" />

            <button
              id="sign-up-submit"
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
        <p>already have an account?</p>
        <button
          type="button"
          className="btn btn_flip"
          onClick={props.switchHandle}
        >
          Enter now!
        </button>
      </div>
    </Fragment>
  );
};
export default SignUpForm;
