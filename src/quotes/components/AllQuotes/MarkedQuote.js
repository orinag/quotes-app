import "./MarkedQuote.css";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import QuotesContext from "../../store/quotes-context";

const MarkedQuote = (props) => {
  const quotesCtx = useContext(QuotesContext);
  const history = useHistory();

  const handleDelete = () => {
    quotesCtx.deleteQuote(props._id);
    history.push("/quotes");
  };
  return (
    <figure className="marked-quote">
      <blockquote>"{props.quote}"</blockquote>
      <p>-{props.auther}</p>
      <div className="marked_actions">
        <Link className="btn" to="/quotes">
          Back
        </Link>
        <button className="btn-warning" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </figure>
  );
};

export default MarkedQuote;
