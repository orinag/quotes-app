import { Fragment } from "react";
import { useHistory } from "react-router-dom";

import { useStore } from "../../../shared/hooks-store/store";
import useForm from "../../../shared/hooks/form-hook";
import useHttp from "../../../shared/hooks/http-hook";
import Input from "../../../shared/components/FormElements/Input";
import "./QuoteForm.css";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner";
import Backdrop from "../../../shared/components/UI/Backdrop";
import Modal from "../../../shared/components/UI/Modal";

const QuoteForm = () => {
  const state = useStore()[0];
  const [addQuoteReq, isLoading, err, clearErr] = useHttp();
  const [formState, setInput] = useForm(
    {
      author: { value: "", IsValid: false },
      quote: { value: "", IsValid: false },
    },

    false
  );
  const history = useHistory();
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(state.currentUser);
    const newQuote = {
      author: formState.inputs.author.value,
      content: formState.inputs.quote.value,
    };
    addQuoteReq("ADD", {
      url: "http://localhost:5000/api/quotes/add-quote",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + state.token,
      },
      body: JSON.stringify({
        author: newQuote.author,
        content: newQuote.content,
        creator: state.currentUser,
      }),
    });

    document.getElementById("author").value = "";
    document.getElementById("quote").value = "";
    history.push("/quotes");
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
      <form className="form" onSubmit={submitHandler}>
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
      </form>
    </Fragment>
  );
};

export default QuoteForm;
