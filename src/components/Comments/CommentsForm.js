import { useContext } from "react";
import useForm from "../../hooks/form-hook";
import QuotesContext from "../../store/quotes-context";
import Input from "../FormElements/Input";
import "./CommentsForm.css";

const CommentsForm = (props) => {
  const quotesCtx = useContext(QuotesContext);
  const [formState, inputHandler, setFormHandler] = useForm(
    {
      name: { value: "", IsValid: false },
      comment: { value: "", IsValid: false },
    },

    false
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    quotesCtx.addComment(props.id, formState.inputs);
    props.handleSend();
  };
  console.log(formState.isValid);
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form_inputs">
        <Input
          id="name"
          element="input"
          className="name_input"
          onInput={inputHandler}
        >
          Name :
        </Input>
        <Input
          id="comment"
          element={"textarea"}
          rows={6}
          onInput={inputHandler}
        >
          Comment :
        </Input>
      </div>

      <button className="btn" type="submit" disabled={!formState.isValid || formState.inputs}>
        Send
      </button>
    </form>
  );
};

export default CommentsForm;
