import { Fragment, memo } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "../../../users/components/Auth/Forms.css";
import { useStore } from "../../../shared/hooks-store/store";
import useHttp from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner";
import Backdrop from "../../../shared/components/UI/Backdrop";
import Modal from "../../../shared/components/UI/Modal";

const EditForm = memo((props) => {
  const state = useStore(false)[0];
  const [editReq, isLoading, err, clearErr] = useHttp();
  const history = useHistory();

  const submitHandler = (values) => {
    props.closeForm();
    const editedQuote = {
      author: values.author,
      content: values.content,
    };
    editReq("EDIT", {
      url: `${process.env.REACT_APP_BACKEND_URL}/quotes/${props.id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + state.token,
      },
      body: JSON.stringify({
        author: editedQuote.author,
        content: editedQuote.content,
      }),
    });
    history.push("/");
  };

  return (
    <Fragment>
      {err && (
        <Modal
          onClick={() => {
            clearErr();
          }}
          header="Error"
          content={err.message}
          err={true}
          button="Ok"
        ></Modal>
      )}
      {isLoading && (
        <Backdrop className="centered">
          <LoadingSpinner />
        </Backdrop>
      )}
      <Formik
        initialValues={{ author: props.author, content: props.content }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.author) {
            errors.author = "Author name is required";
          }

          if (!values.content) {
            errors.content = "Quote is required";
          } else if (values.content.trim().length < 5) {
            errors.content =
              "Invalid quote length, must be more then 5 characters";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            submitHandler(values);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form form-control">
            <div className="errs_container">
              <ErrorMessage className="invalid" name="author" component="div" />
              <ErrorMessage
                className="invalid"
                name="content"
                component="div"
              />
            </div>

            <label id="author" type="author">
              Author:
            </label>
            <Field id="author-input" type="author" name="author" />
            <label type="content">Quote:</label>
            <Field
              id="content-textarea"
              type="content"
              name="content"
              as="textarea"
              rows={10}
            />
            <button
              id="edit-quote-submit"
              className="btn"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
});

export default EditForm;

/*<form className="form" onSubmit={submitHandler}>
        <div className="author_input">
          <Input id="author" element={"input"} type="text" onInput={setInput}>
            Author:
          </Input>
        </div>
        <div className="quote_input">
          <Input id="quote" element={"textarea"} rows={10} onInput={setInput}>
            Quote:
          </Input>
        </div>
        <div className="form_actions">
          <button
            id="add-quote"
            type="submit"
            disabled={
              !formState.isValid ||
              formState.inputs.author?.value === "" ||
              formState.inputs.quote?.value === ""
            }
          >
            Submit
          </button>
        </div>
      </form> */
