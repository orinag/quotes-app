import "./SingleQuote.css";
import { Link, useHistory } from "react-router-dom";
import { Fragment } from "react";
import { useContext } from "react";
import QuotesContext from "../../store/quotes-context";

const SingleQuote = (props) => {
  const history = useHistory();
  const quotesCtx = useContext(QuotesContext);
  const handleDelete = () => {
    quotesCtx.deleteQuote(props.id);
    history.push("/quotes");
  };
  console.log(props);
  return (
    <Fragment>
      <figure className="quote">
        <blockquote className="border-bottom">
          <strong className="mark-top">❝</strong>
          <br />
          <h1> {props.quote}</h1>

          <br />
          <strong className="mark-bot">❞</strong>
        </blockquote>

        <div className="actions">
          <button className="delete" onClick={handleDelete}>
            🚫
          </button>
          <Link to={`/${props.id}/comments`} className="comment">
            📨
          </Link>
          <button className="like">👍</button>
        </div>
      </figure>
      <p className="author">-{props.auther}</p>
    </Fragment>
  );
};

export default SingleQuote;
