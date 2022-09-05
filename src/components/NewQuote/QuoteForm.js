import { useContext } from "react";
import useForm from "../../hooks/form-hook";
import QuotesContext from "../../store/quotes-context";
import Input from "../FormElements/Input";
import "./QuoteForm.css";

const QuoteForm = () => {
  const quoteCtx = useContext(QuotesContext);
  const [formState, setInput] = useForm(
    {
      author: { value: "", IsValid: false },
      quote: { value: "", IsValid: false },
    },

    false
  );
  console.log(formState.inputs.author?.value);

  const submitHandler = (event) => {
    quoteCtx.addQuote({
      _id: 1234,
      content: formState.inputs.quote.value,
      author: formState.inputs.author.value,
    });

    document.getElementById("author").value = "";
    document.getElementById("quote").value = "";
  };

  return (
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
  );
};

export default QuoteForm;
