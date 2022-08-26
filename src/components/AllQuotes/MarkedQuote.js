import "./MarkedQuote.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import QuotesContext from "../../store/quotes-context";

const MarkedQuote = (props) => {
  const quotesCtx = useContext(QuotesContext);

  const handleDelete = () => {
    console.log(props._id);
    quotesCtx.deleteQuote(props._id);
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
