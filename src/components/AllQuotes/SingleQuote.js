import "./SingleQuote.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const SingleQuote = (props) => {
  return (
    <Fragment>
      <figure className="quote">
        <Link to={`/quotes/${props.id}`}>
          <blockquote className="border-bottom">
            <strong className="mark-top">❝</strong>
            <br />
            <h1> {props.quote}</h1>

            <br />
            <strong className="mark-bot">❞</strong>
          </blockquote>
        </Link>
        <div className="actions">
          <button className="delete">🚫</button>
          <button className="comment">📨</button>
          <button className="like">👍</button>
        </div>
      </figure>
      <p className="author">-{props.auther}</p>
    </Fragment>
  );
};

export default SingleQuote;
