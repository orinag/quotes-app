import { Fragment } from "react";
import useForm from "../../hooks/form-hook";
import useHttp from "../../hooks/http-hook";
import Input from "../FormElements/Input";
import "./QuoteForm.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import Backdrop from "../UI/Backdrop";
import Modal from "../UI/Modal";
import { useHistory } from "react-router-dom";

const QuoteForm = () => {
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
    const newQuote = {
      author: formState.inputs.author.value,
      content: formState.inputs.quote.value,
    };
    addQuoteReq({
      url: "http://localhost:5000/add-quote",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: newQuote.author,
        content: newQuote.content,
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
      <form className="new-quote-form" onSubmit={submitHandler}>
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
              formState.inputs.author?.value == "" ||
              formState.inputs.quote?.value == ""
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
